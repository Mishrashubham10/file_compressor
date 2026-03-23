import { Queue } from 'bullmq';
import { redisConnection } from '../../config/redis';

/*
 ************ COMPRESSION QUEUE ***************
 */
export const compressionQueue = new Queue('compression', {
  connection: redisConnection as any,
});