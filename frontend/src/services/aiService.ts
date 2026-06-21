import type { ChatMessage } from '../types/chat'

async function streamSSE(
  url: string,
  body: unknown,
  onChunk: (delta: string) => void,
): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok || !response.body) {
    throw new Error('Failed to reach the AI assistant.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue

      const payload = trimmed.slice('data:'.length).trim()
      if (payload === '[DONE]') return

      try {
        const parsed = JSON.parse(payload) as { delta?: string; error?: string }
        if (parsed.error) throw new Error(parsed.error)
        if (parsed.delta) onChunk(parsed.delta)
      } catch {
        // Ignore malformed chunks; keep reading the stream.
      }
    }
  }
}

export const aiService = {
  sendMessage(messages: ChatMessage[], onChunk: (delta: string) => void): Promise<void> {
    return streamSSE('/api/ai/chat', { messages }, onChunk)
  },

  generateProfile(onChunk: (delta: string) => void): Promise<void> {
    return streamSSE('/api/ai/profile', {}, onChunk)
  },

  explainTrust(credentialId: string, onChunk: (delta: string) => void): Promise<void> {
    return streamSSE('/api/ai/credential-trust', { credentialId }, onChunk)
  },
}
