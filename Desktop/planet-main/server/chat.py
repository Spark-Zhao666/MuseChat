import asyncio
import json
import os

import uvicorn
from uuid import UUID

os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
os.environ["DEEPSEEK_API_KEY"] = ""
os.environ["TAVILY_API_KEY"] = ""
os.environ["SUNO_API"] = ""


from fastapi import FastAPI, WebSocket
from typing import  Annotated


from music.generation import generate_music

Emotions = ["anger","annoyance","disapproval","disgust","fear","nervousness",
            "joy","amusement","approval","excitement","gratitude","love",
            "optimism","relief","pride","admiration","desire","caring",
            "sadness","disappointment","embarrassment","grief","remorse",
            "surprise","realization","confusion","curiosity"]

# 全局任务存储字典
generation_tasks = {}


# 异步音乐生成任务
async def background_music_generation(user_id: UUID, prompt: str):
    """在后台生成音乐并更新状态"""
    try:
        print(f"Starting music generation for user {user_id}")

        # 调用音乐生成函数
        music_result = await generate_music_from_prompt(prompt)

        # 提取URL - 假设generate_music返回的格式是URL列表
        if isinstance(music_result, list) and music_result:
            music_url = music_result[0]  # 取第一个URL
        elif isinstance(music_result, str):
            music_url = music_result
        else:
            music_url = ""
        await manager.send_personal_message(json.dumps({
            "messages": [
                ["assistant","The music is generated, enjoy it!"]
            ],
            "music_url": music_url,
        }), user_id)
        print(f"Music generation completed for user {user_id}")

    except Exception as e:
        error_msg = f"Music generation failed: {str(e)}"
        print(f"{error_msg} for user {user_id}")
        await manager.send_personal_message(json.dumps({
            "messages": [
                ["assistant","The music generation failed, please try again later."]
            ],
            "music_url": "",
        }), user_id)
    finally:
        # 清理任务
        if user_id in generation_tasks:
            del generation_tasks[user_id]

# @tool
async def generate_music_from_prompt(prompt: str) -> str:
    """Generate a song using the provided prompt."""
    # return "\n\n".join(generate_music(prompt))
    # await asyncio.sleep(10)
    print(f"Generating music from prompt {prompt}")
    return await generate_music(prompt)

def make_system_prompt(suffix: str) -> str:
    return (
        "You are a helpful AI assistant, collaborating with other assistants."
        " Use the provided tools to progress towards answering the question."
        f"\n{suffix}"
    )

from typing import List, Optional, Literal
from langchain_core.language_models.chat_models import BaseChatModel

from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.types import Command

from typing_extensions import TypedDict

class State(MessagesState):
    next: str
    # music_url: str
    emotion: str
    is_music_generating:bool


def make_supervisor_node(llm: BaseChatModel, members: list[str]) -> str:
    # options = ["FINISH"] + members
    # system_prompt = (
    #     "You are a supervisor tasked with managing a conversation between the"
    #     f" following workers: {members}. Given the following user request,"
    #     " respond with the worker to act next. Each worker will perform a"
    #     " task and respond with their results and status. When finished,"
    #     " respond with FINISH."
    # )
    system_prompt = (
        "You are a supervisor tasked with managing a conversation between the"
        f" following workers: {members}. Given the following user request,"
        " respond with the worker to act next. Each worker will perform a"
        " task and respond with their results and status. Only respond with the workers name."
        "If the consult worker has not yet determined the user's emotion, route to consult."
    )

    class Router(TypedDict):
        """Worker to route to next. If no workers needed, route to FINISH."""

        # next: Literal[*members]
        next: Annotated[Optional[str],...,"Only respond with the workers name, its consult or generate_music"]

    def supervisor_node(state: State) -> Command[Literal[*members, "__end__"]]:
        """An LLM-based router."""
        messages = [{"role": "system", "content": system_prompt+
        f"If emotion {state["emotion"]} not in {Emotions},go to consult node." +
        f"If is_music_generating:{state["is_music_generating"]} is True, always go to consult node"}, ] + state["messages"]
        if not state["messages"]:
            goto = "supervisor"
        else:
            try:
                response = llm.with_structured_output(Router).invoke(messages)
                goto = response["next"]
            except Exception as e:
                print(f"Error invoking LLM: {e}")
                # Fallback to supervisor if LLM fails
                goto = "supervisor"

        # 判断有没有情绪，没有的话继续consult
        if goto == "generate_music" and state["emotion"] not in Emotions:
            goto = "consult"

        print("is_music_generating:", state["is_music_generating"])
        if state["is_music_generating"]:
            # 如果正在生成音乐，直接返回到consult
            goto = "consult"

        if goto == "FINISH":
            # goto = END
            goto = "consult"
        return Command(goto=goto, update={"next": goto})

    return supervisor_node

from langchain_core.messages import HumanMessage
from langchain_deepseek import ChatDeepSeek
from langgraph.prebuilt import create_react_agent

llm = ChatDeepSeek(model="deepseek-chat")

from pydantic import BaseModel
class Consult(BaseModel):
    """Consultation with the user to understand their emotions and music preferences."""
    messages: List[HumanMessage]
    emotion: Annotated[str, ..., f"The emotion of the user, only {Emotions}"]
consult_agent = create_react_agent(llm, tools=[],
                                   response_format=Consult,
                                   prompt=make_system_prompt(
        f"""
            You are a psychologist. Your job is to figure out the user's emotions and their favorite music genres.

            Here are the steps you can follow:
            1. Figure out their emotions from input of the user's text.
            2. If you are not sure about the emotions, based on the knowledge you know, you can ask follow up questions to clarify.
            3. Once you are certain about the emotions, make sure the emotions is in {Emotions}, you can start to ask their favorite genres of music.
            4. If you don't certain about the emotions, chat more with user, dont chat about music.
            5. Once you are certain about the music genres, based on their emotions, you can go ahead and tell the supervisor to generate a song.
            6. Never tell the user the supervisor's exist, only chat emotion and music.

            Important: The emotion you output MUST be strictly one of {Emotions}. If you are not sure, do not guess, ask more questions until you are sure. Never output an emotion outside this list.

            Do that in separate steps, and answer only in one sentence.
        """
    ))


def consult_node(state: State) -> Command[Literal["supervisor"]]:
    messages = [{"role": "system", "content": f"if is_music_generating:{state["is_music_generating"]} "
                                              f"is False, talk more about emotion,don't ask about music genres"}] + state["messages"]
    result = consult_agent.invoke({"messages": messages})
    # 只允许Emotions范围内的情绪
    emotion = result["structured_response"].emotion
    if emotion not in Emotions:
        emotion = ""
    return Command(
        update={
            "messages": [
                HumanMessage(content=result["messages"][-1].content, name="consult")
            ],
            "emotion": emotion,
        },
        # We want our workers to ALWAYS "report back" to the supervisor when done
        # goto="supervisor",
    )

class Music(BaseModel):
    """Music to tell"""
    music_url: Annotated[str,...,"the url of the music"]
    content: Annotated[str,...,"the content of the chat,not including the url"]

generate_music_agent = create_react_agent(
    llm,
    # tools=[generate_music_from_prompt],
    tools=[],
    response_format=Music,
    prompt=make_system_prompt
    (
        "When being called, you are responsible for generating lyrics based on the user prompt. "
        # "Only get music_url from the tool, and return the music_url and content in the response. "
    )
)
def generate_music_node(state: State) -> Command[Literal["supervisor"]]:
    result = generate_music_agent.invoke(state)
    return Command(
        update={
            "messages": [
                HumanMessage(content=result["structured_response"].content, name="generate_music")
            ],
            # "music_url": result["structured_response"].music_url,
            "is_music_generating": True,
        },
        # We want our workers to ALWAYS "report back" to the supervisor when done
        # goto="supervisor",
    )
research_supervisor_node = make_supervisor_node(llm, ["consult", "generate_music"])

research_builder = StateGraph(State)
research_builder.add_node("supervisor", research_supervisor_node)
research_builder.add_node("consult", consult_node)
research_builder.add_node("generate_music", generate_music_node)

research_builder.add_edge(START, "supervisor")
research_graph = research_builder.compile()


from uuid import UUID, uuid4
# ====================== WebSocket 连接管理器 ======================
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[UUID, WebSocket] = {}

    async def connect(self, user_id: UUID, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: UUID):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: str, user_id: UUID):
        if websocket := self.active_connections.get(user_id):
            await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)


manager = ConnectionManager()
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 添加CORS中间件，允许所有来源跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/gen_user_id")
def gen_user_id():
    import uuid
    user_id = str(uuid.uuid4())
    return JSONResponse(content={"user_id": user_id})

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    try:
        user_uuid = UUID(user_id)
    except Exception:
        import uuid
        user_uuid = uuid.uuid4()
    await manager.connect(user_uuid, websocket)
    state = {
        "messages": [],
        # "music_url": "",
        "emotion": "",
        "is_music_generating": False,
    }
    try:
        while True:
            data = await websocket.receive_text()
            print(f"User:{user_uuid} Received data: {data}")
            json_data = json.loads(data)
            state["messages"].append(("user", json_data["messages"][-1]["text"]))

            # #test
            # state["music_url"] = "https://cdn1.suno.ai/d6310ad6-e6c2-43bd-bba6-ce0ee50b48d7.mp3"
            # await manager.send_personal_message(json.dumps(state, ensure_ascii=False), user_uuid)
            # continue


            async for chunk in research_graph.astream(state, stream_mode="updates"):
                # print(chunk)
                print(f"User:{user_uuid} chunk: {chunk}")
                if "consult" in chunk:
                    assistant_message = chunk["consult"]["messages"][-1].content
                    state["messages"].append(("assistant", assistant_message))
                    if chunk["consult"] and chunk["consult"]["emotion"] in Emotions:
                        state["emotion"] = chunk["consult"]["emotion"]
                    else:
                        print("Emotion not recognized:", chunk["consult"]["emotion"])
                    print(state)
                    await manager.send_personal_message(json.dumps(state, ensure_ascii=False), user_uuid)
                elif "generate_music" in chunk:
                    # 启动音乐生成任务
                    prompt = chunk["generate_music"]["messages"][-1].content
                    print(f"User:{user_uuid} Generating music with prompt: {prompt}")

                    # 检查是否已有任务运行，避免重复
                    if user_uuid in generation_tasks:
                        generation_tasks[user_uuid].cancel()

                    # 创建后台任务
                    task = asyncio.create_task(background_music_generation(user_uuid, prompt))
                    generation_tasks[user_uuid] = task
                    state["messages"].append(("assistant", f"{prompt} \nThe music is being generated, please wait..."))
                    state["is_music_generating"] = True
                    await manager.send_personal_message(json.dumps(state, ensure_ascii=False), user_uuid)

                    # assistant_message = chunk["generate_music"]["messages"][-1].content
                    # state["messages"].append(("assistant", assistant_message))
                    # state["music_url"] = chunk["generate_music"]["music_url"]
                    # print(state)
                    # await manager.send_personal_message(json.dumps(state, ensure_ascii=False), user_uuid)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(user_uuid)


if __name__ == "__main__":
    # task = asyncio.create_task(background_music_generation("123","A gentle, melancholic piano ballad with soft vocals, expressing the bittersweet pain of loss but also the beautiful memories that remain, to help process grief and bring a sense of quiet comfort."))
    print("Starting the research graph...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
