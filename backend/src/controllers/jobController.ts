import { Request, Response } from 'express';
import jobs from '../data/jobs.json';

export function getJobs(_req: Request, res: Response) {
  res.json(jobs);
}

export function getJobById(req: Request, res: Response) {
  const job = jobs.find((j) => j.id === req.params.id);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
}
