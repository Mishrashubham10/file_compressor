'use client';

import { useState } from 'react';

interface Props {
  before: string;
  after: string;
}

export function ImageCompare({ before, after }: Props) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full h-60 overflow-hidden rounded-xl mt-3">
      {/* ========= AFTER BACKGROUND IMG ========== */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        After
      </div>
      <img
        src={after}
        alt="after"
        className="absolute w-full h-full object-cover"
      />

      {/* =========== BEFORE (OVERLAY) ============== */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Before
        </div>
        <img src={before} className="w-full h-full object-cover" alt="before" />
      </div>

      {/* ============ SLIDER LINE ============= */}
      <div
        className="absolute top-0 h-full w-1 bg-white"
        style={{ left: `${position}%` }}
      >
        {/* ========== INPUT RANGE =========== */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute bottom-2 left-1/2 w-3/4"
        />
      </div>
    </div>
  );
}