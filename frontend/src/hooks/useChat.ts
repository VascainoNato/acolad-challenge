import { useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import { aiService } from '../services/aiService'
import type { ChatMessage } from '../types/chat'

const ERROR_MESSAGE =
  "Sorry, I couldn't reach the assistant right now. Please try again in a moment."

export function useChat() {
  const messages = useChatStore((s) => s.messages)
  const isStreaming = useChatStore((s) => s.isStreaming)
  const addMessage = useChatStore((s) => s.addMessage)
  const appendToLast = useChatStore((s) => s.appendToLast)
  const setStreaming = useChatStore((s) => s.setStreaming)
  const reset = useChatStore((s) => s.reset)

  const [input, setInput] = useState('')

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || isStreaming) return

    const userMessage: ChatMessage = { role: 'user', content }
    const history = [...messages, userMessage]

    addMessage(userMessage)
    addMessage({ role: 'assistant', content: '' })
    setInput('')
    setStreaming(true)

    try {
      await aiService.sendMessage(history, (chunk) => appendToLast(chunk))
    } catch {
      appendToLast(ERROR_MESSAGE)
    } finally {
      setStreaming(false)
    }
  }

  function startNewChat() {
    if (isStreaming) return
    reset()
    setInput('')
  }

  return { messages, input, setInput, send, isStreaming, startNewChat }
}
