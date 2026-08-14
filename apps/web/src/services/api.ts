import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  getStats: async () => {
    const response = await apiClient.get('/api/stats');
    return response.data;
  },

  getCalls: async () => {
    const response = await apiClient.get('/api/calls');
    return response.data;
  },

  startCall: async (data: any) => {
    const response = await apiClient.post('/api/calls/start', data);
    return response.data;
  },

  endCall: async () => {
    const response = await apiClient.post('/api/calls/end');
    return response.data;
  },

  getCustomers: async () => {
    const response = await apiClient.get('/api/customers');
    return response.data;
  },

  getAppointments: async () => {
    const response = await apiClient.get('/api/appointments');
    return response.data;
  },
};