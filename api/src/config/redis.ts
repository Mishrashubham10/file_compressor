import { Redis } from 'ioredis';

/*
 ************** REDIS CONNECTION ****************
 */
export const redisConnection = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null, // ✅ REQUIRED for BullMQ
});