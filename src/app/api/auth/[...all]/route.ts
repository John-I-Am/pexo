import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/lib/betterAuth/auth';

export const { POST, GET } = toNextJsHandler(auth);
