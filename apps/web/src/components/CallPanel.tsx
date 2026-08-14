import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { LiveKitRoom, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import Transcript from './Transcript';

interface CallPanelProps {
  onClose: () => void;
}

export default function CallPanel({ onClose }: CallPanelProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [transcript, setTranscript] = useState<Array<{ speaker: string; text: string }>>([]);
  const [roomUrl, setRoomUrl] = useState('');
  const [token, setToken] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeCall();
  }, []);

  const initializeCall = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/calls/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await response.json();
      setRoomUrl(data.roomUrl);
      setToken(data.token);
      setIsConnecting(false);
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/calls/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
    } catch (error) {
      console.error('Failed to end call:', error);
    }
    onClose();
  };

  const handleAddTranscript = (speaker: string, text: string) => {
    setTranscript(prev => [...prev, { speaker, text }]);
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Connecting to call...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Active Call</h2>
          <button
            onClick={handleEndCall}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2">
            <LiveKitRoom
              serverUrl={roomUrl}
              token={token}
              connect={true}
              video={true}
              audio={true}
            >
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    {isVideoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                  </button>
                  <button
                    onClick={handleEndCall}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                  >
                    <PhoneOff className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </LiveKitRoom>
          </div>

          <div className="col-span-1">
            <Transcript transcript={transcript} />
          </div>
        </div>
      </div>
    </div>
  );
}