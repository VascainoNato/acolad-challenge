import { create } from 'zustand'
import type { ChatMessage } from '../types/chat'

interface ChatStore {
  messages: ChatMessage[]
  isStreaming: boolean
  addMessage: (message: ChatMessage) => void
  appendToLast: (chunk: string) => void
  setStreaming: (value: boolean) => void
  reset: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isStreaming: false,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  appendToLast: (chunk) =>
    set((state) => {
      if (state.messages.length === 0) return state
      const messages = state.messages.slice()
      const last = messages[messages.length - 1]
      messages[messages.length - 1] = { ...last, content: last.content + chunk }
      return { messages }
    }),

  setStreaming: (value) => set({ isStreaming: value }),

  reset: () => set({ messages: [], isStreaming: false }),
}))
