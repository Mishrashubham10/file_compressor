'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
      <motion.div
        className="bg-blue-500 h-2"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
