import { Router } from 'express';
import { getHealth } from '../controllers/healthController';
import { getProfile } from '../controllers/profileController';
import { getJobs, getJobById } from '../controllers/jobController';
import { getCredentials } from '../controllers/credentialController';
import { postChat, postProfile, postCredentialTrust } from '../controllers/aiController';

const router = Router();

router.get('/health', getHealth);
router.get('/profile', getProfile);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/credentials', getCredentials);
router.post('/ai/chat', postChat);
router.post('/ai/profile', postProfile);
router.post('/ai/credential-trust', postCredentialTrust);

export default router;
