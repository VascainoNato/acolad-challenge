import { Request, Response } from 'express';
import { openai, AI_MODEL } from '../lib/openai';
import { buildSystemPrompt, PROFILE_INSTRUCTION, buildTrustInstruction } from '../lib/systemPrompt';
import credentials from '../data/credentials.json';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type PromptMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

async function streamCompletion(res: Response, messages: PromptMessage[]) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  try {
    const stream = await openai.chat.completions.create({
      model: AI_MODEL,
      stream: true,
      messages,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? '';
      if (delta) {
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('AI streaming error:', err);
    res.write(`data: ${JSON.stringify({ error: 'AI assistant is unavailable right now.' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

export async function postChat(req: Request, res: Response) {
  const { messages } = req.body as { messages?: ChatMessage[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  await streamCompletion(res, [
    { role: 'system', content: buildSystemPrompt() },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ]);
}

export async function postProfile(_req: Request, res: Response) {
  await streamCompletion(res, [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'user', content: PROFILE_INSTRUCTION },
  ]);
}

export async function postCredentialTrust(req: Request, res: Response) {
  const { credentialId } = req.body as { credentialId?: string };
  const credential = credentials.find((c) => c.id === credentialId);

  if (!credential) {
    return res.status(400).json({ error: 'credentialId not found' });
  }

  await streamCompletion(res, [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'user', content: buildTrustInstruction(credential.name) },
  ]);
}
