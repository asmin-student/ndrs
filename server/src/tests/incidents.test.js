const request = require('supertest');
const app = require('../server');
const { pool } = require('../config/db');
let authToken;

describe('Incident Routes', () => {
  beforeAll(async () => {
    // Login to get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = loginRes.body.data.token;
  });

  describe('POST /api/incidents', () => {
    it('should create a new incident', async () => {
      const res = await request(app)
        .post('/api/incidents')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Incident',
          type: 'flood',
          location: 'Bardiya District',
          severity: 'high',
          description: 'Test description',
          affected_people: 100
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.incident).toHaveProperty('id');
    });

    it('should not create incident without auth', async () => {
      const res = await request(app)
        .post('/api/incidents')
        .send({
          title: 'Test Incident',
          type: 'flood',
          location: 'Bardiya District',
          severity: 'high'
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/incidents', () => {
    it('should get all incidents', async () => {
      const res = await request(app)
        .get('/api/incidents')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data.incidents)).toBeTruthy();
    });
  });
});