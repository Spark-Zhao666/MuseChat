<template>
  <div class="chat-container">
    <div class="dialog-header">
      <h2>Feeling overwhelmed?<br>Let's talk.</h2>
    </div>

    <div class = "messages-wrapper" ref="messagesContainer">
    <TransitionGroup name="message-fade" tag="div" class="messages" >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.sender]"
      >
        <template v-if="msg.sender === 'ai' && msg.text === 'AI正在输入...'"><span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></template>
        <template v-else>{{ msg.text }}</template>
      </div>
    </TransitionGroup>
    </div>

    <div class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        :disabled="loading"
        placeholder="You can say anything here."
      />
      <button @click="sendMessage" :disabled="loading">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import emitter from '../utils/emitter'
import {gen_user_id} from "@/utils/gen_user_id.ts";

import {config} from '../../config.ts'

interface Message {
  text: string
  sender: 'user' | 'ai'
}

const messages = reactive<Message[]>([
  // {
  //   text: "I think I might be depressed. Everything feels heavy.",
  //   sender: 'user'
  // },
  // {
  //   text: "It sounds like you're carrying a lot, and that weight is real. In psychology, we call this emotional overload-when your mind is trying to manage more than it can hold. It's not a failure. It's a signal that you need space, rest, and kindness.",
  //   sender: 'ai'
  // }
])

const userInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const loading = ref(false)
let ws: WebSocket | null = null

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (!userInput.value.trim() || loading.value) return
  messages.push({
    text: userInput.value,
    sender: 'user'
  })

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ messages }))
  }
  loading.value = true
  // 插入AI正在输入的占位消息
  messages.push({
    text: 'AI正在输入...',
    sender: 'ai'
  })
  scrollToBottom()

  userInput.value = ''
}

const handleWSMessage = (event: MessageEvent) => {
  try {
    console.log('Received message:', event)
    const data = JSON.parse(event.data)
    console.log('Parsed data:', data)
    // 移除最后一条AI占位消息
    const lastMsg = messages[messages.length - 1]
    // 判断是否有音乐
    if (data.music_url) {
      // 查找“AI正在输入...”的索引
      const typingIdx = messages.findIndex(
        (msg) => msg.sender === 'ai' && msg.text === 'AI正在输入...'
      )
      if (typingIdx > 0) {
        // 在“AI正在输入...”前插入music_url相关消息
        messages.splice(
          typingIdx,
          0,
            { text: data.messages.slice(-1)[0][1], sender: 'ai' }
        )
      } else {
        // 没有占位，直接push到最后
        messages.push({ text: data.messages.slice(-1)[0][1], sender: 'ai' })
      }
      emitter.emit('action', {
        type: 'play_music',
        value: data.music_url
      })
    }else {
      if (!data.music_url && lastMsg && lastMsg.sender === 'ai' && lastMsg.text === 'AI正在输入...') {
        messages.pop()
      }
      if (data.messages && data.messages.length > 0) {
        messages.push({ text: data.messages.slice(-1)[0][1], sender: 'ai' })
      }
    }
    loading.value = false
    scrollToBottom()
    // consult 节点，允许输入
    if (data.consult) {
      loading.value = false
    }
    // 判断是否有情绪了
    if (data.emotion) {
      emitter.emit('action', {
        type: 'create_planet',
        value: data.emotion
      })}
  } catch (e) {
    // ignore
  }
}

onMounted(async () => {
  // 获取用户id先
  const user_id = await gen_user_id();
  console.log('user_id:', user_id)
  ws = new WebSocket(`${config.wsUrl}/ws/${user_id}`) // 可将user_id作为参数传递

  ws.onmessage = handleWSMessage
  ws.onopen = () => {
    // 可选：连接建立后可发送历史消息
    messages.push({
      text: 'Hello! I am here to listen.',
      sender: 'ai'
    })
  }
  ws.onerror = () => {
    loading.value = false
    messages.push({
      text: 'Connection error. Please refresh the page.',
      sender: 'ai'
    })
  }
  ws.onclose = () => {
    loading.value = false
    messages.push({
      text: 'Connection closed. Please refresh the page.',
      sender: 'ai'
    })
  }
})

onBeforeUnmount(() => {
  if (ws) {
    ws.close()
    ws = null
  }
})

watch(
  () => messages.length,
  () => scrollToBottom()
)
</script>

<style scoped>
.chat-container {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 30%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
}

.dialog-header {
  margin-bottom: 1rem;
}

.typing-indicator {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.messages-wrapper {
  height: 300px; 
  overflow-y: auto;
  position: relative;
}

.messages {
  /* height: 300px; */
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  margin: 0.5rem 0;
  padding: 0.8rem;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background: rgba(255, 255, 255, 0.1);
  margin-left: auto;
}

.message.ai {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-container {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  color: white;
}

button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.loading-dots {
  display: inline-block;
}
.loading-dots span {
  display: inline-block;
  animation: loading-bounce 1s infinite;
  font-size: 1em;
  color: #aaa;
}
.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
</style>

