const request = require('supertest');
const app = require('../app');
const { supabase } = require('../config/db');

describe('Test Authentication Endpoints', () => {
  describe('POST /auth/register', () => {
    it('Should create a new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'sclover@gmail.com',
          firstName: 'Steve',
          lastName: 'Clover',
          password: '123456',
          phone: '09087654321',
        });

      expect(response.status).toBe(201);
    });
  });
});
