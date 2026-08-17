import React, { useEffect, useState } from 'react';
import { Phone, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

interface Call {
  id?: string | number;
  customerName?: string;
  customerId?: string | number;
  duration?: number;
  status?: string;
  createdAt?: string;
}

export default function Calls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const data = await api.getCalls();
      setCalls(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch calls:', error);
      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              VoiceForge
            </h1>
            <p className="text-sm text-gray-500">
              Call History
            </p>
          </div>

          <button
            onClick={fetchCalls}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Calls
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading calls...
            </div>
          ) : calls.length === 0 ? (
            <div className="p-12 text-center">
              <Phone className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-3 text-gray-600">
                No calls found.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {calls.map((call, index) => (
                <div
                  key={call.id ?? index}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {call.customerName ||
                        `Customer #${call.customerId ?? 'Unknown'}`}
                    </p>

                    <p className="text-sm text-gray-500">
                      {call.createdAt
                        ? new Date(call.createdAt).toLocaleString()
                        : 'Date unavailable'}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-gray-600">
                      {call.duration
                        ? `${call.duration} min`
                        : 'Duration unavailable'}
                    </span>

                    <div className="mt-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {call.status || 'Completed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
