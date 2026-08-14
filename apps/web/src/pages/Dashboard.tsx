import React, { useState, useEffect } from 'react';
import { Phone, Video, Users, Clock, Activity } from 'lucide-react';
import CallPanel from '../components/CallPanel';
import { api } from '../services/api';

interface CallStats {
  totalCalls: number;
  activeCalls: number;
  averageDuration: number;
  satisfactionRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<CallStats>({
    totalCalls: 0,
    activeCalls: 0,
    averageDuration: 0,
    satisfactionRate: 0
  });
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    fetchStats();
  };

  const StatCard = ({ icon: Icon, title, value, subtitle }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">VoiceForge</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">AI Receptionist</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Phone}
            title="Total Calls"
            value={stats.totalCalls}
            subtitle="All time"
          />
          <StatCard
            icon={Activity}
            title="Active Calls"
            value={stats.activeCalls}
            subtitle="Currently active"
          />
          <StatCard
            icon={Clock}
            title="Avg Duration"
            value={`${stats.averageDuration}m`}
            subtitle="Per call"
          />
          <StatCard
            icon={Users}
            title="Satisfaction"
            value={`${stats.satisfactionRate}%`}
            subtitle="Positive feedback"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Recent Calls</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Call #{i}</p>
                      <p className="text-sm text-gray-500">Customer #{1000 + i}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">2 min ago</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <button
                onClick={handleStartCall}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Start New Call
              </button>
              <button
                onClick={() => window.location.href = '/calls'}
                className="w-full mt-3 py-3 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                View All Calls
              </button>
            </div>
          </div>
        </div>

        {isCallActive && (
          <CallPanel onClose={handleEndCall} />
        )}
      </main>
    </div>
  );
}