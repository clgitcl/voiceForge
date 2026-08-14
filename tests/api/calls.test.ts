import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';

const API_URL = process.env.API_URL || 'http://localhost:3001';

describe('Calls API', () => {
  it('should start a new call', async () => {
    const response = await request(API_URL)
      .post('/api/calls/start')
      .send({});
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('callId');
    expect(response.body).toHaveProperty('token');
  });

  it('should get list of calls', async () => {
    const response = await request(API_URL)
      .get('/api/calls');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});