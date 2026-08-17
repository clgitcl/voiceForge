import React from 'react';

interface TranscriptEntry {
  speaker: string;
  text: string;
}

interface TranscriptProps {
  transcript: TranscriptEntry[];
}

export default function Transcript({ transcript }: TranscriptProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Transcript</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {transcript.length === 0 ? (
          <p className="text-sm text-gray-500">
            No transcript available yet.
          </p>
        ) : (
          transcript.map((entry, index) => (
            <div key={index}>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                {entry.speaker}
              </p>
              <p className="text-sm text-gray-800 mt-1">
                {entry.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
