import { Request, Response } from 'express';
import credentials from '../data/credentials.json';

export function getCredentials(_req: Request, res: Response) {
  res.json(credentials);
}
