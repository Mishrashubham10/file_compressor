import { redisConnection } from '../../config/redis';
import fileModel from '../file/file.model';
import { compressImg } from './compression.service';
import { Worker } from 'bullmq';

/*
**************** COMPRESSION WORKER ****************
*/
export const compressionWorker = new Worker(
  'compression',
  async (job) => {
    const { fileId, filePath, mimeType, originalSize } = job.data;

    console.log('WORKER RUNNING:', fileId);

    const file = await fileModel.findById(fileId);
    if (!file) throw new Error('File not found');

    // ✅ Step 1: Processing start
    await fileModel.findByIdAndUpdate(fileId, {
      status: 'PROCESSING',
      progress: 10,
    });

    try {
      if (mimeType.startsWith('image')) {
        // ✅ Step 2
        await fileModel.findByIdAndUpdate(fileId, {
          progress: 30,
        });

        const { outputPath, compressedSize } = await compressImg(filePath);

        // ✅ Step 3
        await fileModel.findByIdAndUpdate(fileId, {
          progress: 80,
        });

        const ratio = ((originalSize - compressedSize) / originalSize) * 100;

        // ✅ Final update
        await fileModel.findByIdAndUpdate(fileId, {
          compressedUrl: outputPath,
          compressedSize,
          compressedRatio: Number(ratio.toFixed(2)),
          progress: 100,
          status: 'DONE',
        });
      } else {
        await fileModel.findByIdAndUpdate(fileId, {
          status: 'DONE',
          progress: 100,
        });
      }
    } catch (err) {
      await fileModel.findByIdAndUpdate(fileId, {
        status: 'PENDING',
        progress: 0,
      });

      throw err;
    }
  },
  {
    connection: redisConnection as any,
  },
);