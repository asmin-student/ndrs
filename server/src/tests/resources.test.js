const request = require('supertest');
const app = require('../server');
const { pool } = require('../config/db');
let authToken;

describe('Resource Routes', () => {
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

  describe('POST /api/resources', () => {
    it('should create a new resource', async () => {
      const res = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Emergency Food Supplies',
          type: 'food',
          quantity: 1000,
          unit: 'packages',
          location: 'Kathmandu Central Warehouse'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.resource).toHaveProperty('id');
    });
  });

  describe('GET /api/resources', () => {
    it('should get all resources', async () => {
      const res = await request(app)
        .get('/api/resources')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data.resources)).toBeTruthy();
    });
  });
});