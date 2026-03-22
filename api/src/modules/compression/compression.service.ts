import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

/*
 **************** IMG COMPRESSION SERVICE ****************
 */
export const compressImg = async (
  inputPath: string,
): Promise<{
  outputPath: string;
  compressedSize: number;
}> => {
  const fileName = path.basename(inputPath);
  const outputPath = `uploads/compressed/${fileName}`;

  await sharp(inputPath).jpeg({ quality: 60 }).toFile(outputPath); // ADJUST SIZE HERE

  const stats = await fs.stat(outputPath);

  return {
    outputPath,
    compressedSize: stats.size,
  };
};