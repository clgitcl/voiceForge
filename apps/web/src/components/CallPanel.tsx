import React, { useEffect, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';
import Transcript from './Transcript';

interface CallPanelProps {
  onClose: () => void;
}

export default function CallPanel({ onClose }: CallPanelProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [transcript, setTranscript] = useState<
    Array<{ speaker: string; text: string }>
  >([]);
  const [roomUrl, setRoomUrl] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    initializeCall();
  }, []);

  const initializeCall = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/calls/start',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to start call: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      console.log('Call started:', data);

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
      await fetch(
        'http://localhost:3001/api/calls/end',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );
    } catch (error) {
      console.error('Failed to end call:', error);
    }

    onClose();
  };

  const handleAddTranscript = (
    speaker: string,
    text: string
  ) => {
    setTranscript((prev) => [
      ...prev,
      { speaker, text },
    ]);
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-600">
              Connecting to call...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!roomUrl || !token) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <p className="text-red-600 font-medium">
            Unable to connect to VoiceForge.
          </p>

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Active Call
          </h2>

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
              audio={true}
              video={false}
              onConnected={() => {
                console.log('LiveKit connected');
              }}
              onDisconnected={() => {
                console.log('LiveKit disconnected');
              }}
            >
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                      <Mic className="w-10 h-10" />
                    </div>

                    <p className="text-lg font-medium">
                      VoiceForge AI Receptionist
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Listening...
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
  <button
    onClick={() => setIsMuted(!isMuted)}
    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
    title={isMuted ? "Unmute microphone" : "Mute microphone"}
  >
    {isMuted ? (
      <MicOff className="w-5 h-5 text-white" />
    ) : (
      <Mic className="w-5 h-5 text-white" />
    )}
  </button>

  <button
    onClick={() => setIsVideoOn(!isVideoOn)}
    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
    title={isVideoOn ? "Turn video off" : "Turn video on"}
  >
    {isVideoOn ? (
      <Video className="w-5 h-5 text-white" />
    ) : (
      <VideoOff className="w-5 h-5 text-white" />
    )}
  </button>

  <button
    onClick={handleEndCall}
    className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
    title="End call"
  >
    <PhoneOff className="w-5 h-5 text-white" />
  </button>
</div>
              </div>

              <RoomAudioRenderer />
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
