'use client';

import {
  useDeleteFileMutation,
  useGetFilesQuery,
  useGetStatusQuery,
} from '@/features/fileApi';
import { ProgressBar } from './ProgressBar';
import { IFile } from '@/types/files';
import { Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { ImageCompare } from './ImageComare';
import { img } from 'framer-motion/client';

export function FileList() {
  const { data } = useGetFilesQuery(undefined);
  const [deleteFile] = useDeleteFileMutation();

  if (!data?.data.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.data?.map((file: IFile) => (
        <FileItem key={file._id} file={file} onDelete={deleteFile} />
      ))}
    </div>
  );
}

interface FileItemProps {
  file: IFile;
  onDelete: (id: string) => void;
}

function FileItem({ file, onDelete }: FileItemProps) {
  const { data } = useGetStatusQuery(file._id);

  const progress = data?.data.progress ?? 0;
  const status = data?.data.status ?? 'PENDING';

  console.log(`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${file.originalUrl}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border rounded-xl bg-white shadow-sm"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{file.originalName}</p>
          <p className="text-xs text-gray-400">
            {(file.originalSize / 1024).toFixed(1)} KB
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            status === 'DONE'
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-3">
        <ProgressBar progress={progress} />
      </div>

      {file.fileType.startsWith('image') && (
        <>
          {status === 'DONE' && file.compressedUrl ? (
            <ImageCompare
              before={`${process.env.NEXT_PUBLIC_IMG_URL}/${file.originalUrl}`}
              after={`${process.env.NEXT_PUBLIC_IMG_URL}/${file.compressedUrl}`}
            />
          ) : (
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${file.originalUrl}`}
              alt="Original Image"
              className="w-full h-40 object-cover rounded mt-3"
            />
          )}
        </>
      )}

      {/* ================= IMAGE PREVIEW ================= */}
      {file.compressedSize && (
        <p className="text-xs text-gray-500 mt-2">
          {(file.originalSize / 1024).toFixed(1)} KB →{' '}
          {(file.compressedSize / 1024).toFixed(1)} KB ({file.compressedRatio}%
          saved)
        </p>
      )}

      {/* ================= COMPRESSION STATS ================ */}
      <div className="flex gap-3 mt-4">
        {status === 'DONE' && (
          <a
            href={`http://localhost:4000/api/v1/files/download/${file._id}`}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            Download
          </a>
        )}

        <button
          onClick={() => onDelete(file._id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
