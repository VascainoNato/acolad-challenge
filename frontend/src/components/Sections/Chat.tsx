import { useEffect, useRef, useState } from 'react'
import { useChat } from '../../hooks/useChat'
import { useConnection } from '../../context/ConnectionContext'
import Bot from '../Icons/Bot'
import Button from '../ui/Button'
import TypingDots from '../ui/TypingDots'

const QUICK_PROMPTS = [
  'Summarize my verified credentials',
  'Which credentials are expiring soon?',
  "What's my interpreting history?",
]

function Chat() {
  const { messages, input, setInput, send, isStreaming, startNewChat } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [preparingSuggestions, setPreparingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const lastMessage = messages[messages.length - 1]
  const hasCompletedAnswer =
    !isStreaming && lastMessage?.role === 'assistant' && lastMessage.content.length > 0

  useEffect(() => {
    if (!hasCompletedAnswer) {
      setPreparingSuggestions(false)
      setShowSuggestions(false)
      return
    }

    setPreparingSuggestions(true)
    setShowSuggestions(false)
    const timer = setTimeout(() => {
      setPreparingSuggestions(false)
      setShowSuggestions(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasCompletedAnswer, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, preparingSuggestions, showSuggestions])

  const isEmpty = messages.length === 0
  const { isOnline } = useConnection()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isOnline) return
    send()
  }

  return (
    <div className="flex flex-col h-full">
      {!isEmpty && (
        <div className="mx-auto flex w-full max-w-2xl justify-end px-4 pt-3">
          <Button variant="ghost" onClick={startNewChat} disabled={isStreaming}>
            + New chat
          </Button>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4">
        {isEmpty ? (
          <div className="mx-auto flex h-full max-w-sm flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300">
              <Bot className="h-6 w-6 dark:invert" />
            </div>
            <p className="mt-3 text-base font-semibold text-gray-900 dark:text-gray-100">Hi, I'm IDA</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              your digital identity assistant. Ask me about your verified
              credentials, trust levels, or your interpreting history.
            </p>

            <div className="mt-5 flex w-full flex-col gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <Button key={prompt} variant="outline" onClick={() => send(prompt)} disabled={!isOnline}>
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
            {messages.map((message, index) => {
              const isUser = message.role === 'user'
              const isLastAssistant = !isUser && index === messages.length - 1
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                      isUser
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.content ||
                      (isLastAssistant && isStreaming ? <TypingDots /> : null)}
                  </div>
                </div>
              )
            })}

            {preparingSuggestions && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 px-3 py-2">
                  <TypingDots />
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="mt-1 flex flex-col gap-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">Suggested questions</p>
                {QUICK_PROMPTS.map((prompt) => (
                  <Button key={prompt} variant="outline" onClick={() => send(prompt)} disabled={!isOnline}>
                    {prompt}
                  </Button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-800 p-3">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming || !isOnline}
            placeholder={isOnline ? 'Ask IDA about your wallet...' : "You're offline — IDA is unavailable"}
            aria-label="Message IDA"
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
          />
          <Button type="submit" variant="primary" disabled={isStreaming || !input.trim() || !isOnline}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Chat
