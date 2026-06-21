import { Request, Response } from 'express';
import profile from '../data/profile.json';

export function getProfile(_req: Request, res: Response) {
  res.json(profile);
}
