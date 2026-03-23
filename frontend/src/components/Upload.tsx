'use client';

import { useUploadFileMutation } from '@/features/fileApi';
import { UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export function Upload() {
  const [uploadFile] = useUploadFileMutation();
  const [dragging, setDragging] = useState(false);

  /*
   ************** HANLDE FILE UPLOAD **************
   */
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const promise = uploadFile(formData).unwrap();

    toast.promise(promise, {
    loading: "Uploading file...",
    success: "File uploaded successfully 🚀",
    error: "Upload failed ❌",
  });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div
      className={`border-2 border-dashed p-8 rounded-xl text-center transition ${
        dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
      }}
    >
      <UploadCloud className="mx-auto mb-2" size={40} />
      <p className="text-gray-600">
        Drag & drop your file here or click to upload
      </p>

      <input
        type="file"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}