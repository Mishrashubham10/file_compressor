import { FileList } from '@/components/FileList';
import { Upload } from '@/components/Upload';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">File Compressor</h1>
        <p className="text-gray-500">
          Upload, compress and manage your files efficiently
        </p>

        <Upload />
        <FileList />
      </div>
    </div>
  );
}