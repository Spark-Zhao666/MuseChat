import asyncio

import aiohttp
import requests
import time
import os

os.environ["SUNO_API"] = ""
from dotenv import load_dotenv
load_dotenv()

suno_api_key = os.getenv("SUNO_API")

async def generate_music(prompt, suno_api_key=suno_api_key):
    url = "https://dzwlai.com/apiuser/_open/suno/music/generate"

    payload = {
        "expectAiModel": "suno",
        "inputType": "10",
        "mvVersion": "chirp-v4",
        "makeInstrumental": True,
        "gptDescriptionPrompt": prompt,
        "callbackUrl": ""
    }
    headers = {
        "x-token": suno_api_key,
        "x-userId": "1000",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "PostmanRuntime-ApipostRuntime/1.1.0",
        "Connection": "keep-alive",
        "Content-Type": "application/json"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload, headers=headers) as response:
            max_retry = 3
            for i in range(max_retry):
                response_data = await response.json()
                task_id = response_data.get("data", {}).get("taskBatchId")
                if task_id:
                    break
                if i < max_retry - 1:
                    print(f"Can't get task ID, retrying {i+1}/{max_retry}...")
                    await asyncio.sleep(2)
            else:
                raise ValueError("Can't get task ID after retries")

        result_url = f"https://dzwlai.com/apiuser/_open/suno/music/getState?taskBatchId={task_id}"
        retry_interval = 10

        print("Pending...")
        while True:
            print("waiting for music...")
            await asyncio.sleep(retry_interval)
            async with session.get(result_url, headers=headers) as result_response:
                result_data = (await result_response.json())["data"]
                if result_data['taskStatus'] == "finished":
                    audio_url = result_data["items"][0]['cld2AudioUrl']
                    print("Finished!")
                    return audio_url

# 测试用例
if __name__ == '__main__':

    prompt = "A gentle, melancholic piano ballad with soft vocals, expressing the bittersweet pain of loss but also the beautiful memories that remain, to help process grief and bring a sense of quiet comfort."
    print(asyncio.run(generate_music(prompt)))
