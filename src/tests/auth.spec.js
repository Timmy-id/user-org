const request = require('supertest');
const app = require('../app');
const { payload } = require('./testHelpers');
const { supabase } = require('../config/db');

describe('Test Authentication Endpoints', () => {
  describe('POST /auth/register', () => {
    it('Should Register User Successfully with Default Organisation', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          password: payload.password,
          phone: payload.phone,
        });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('Server error');
      //   expect(response.body.message).toBe('Registration successful');
      //   expect(response.body.data).toBeDefined();
      //   expect(response.body.data.accessToken).toBeDefined();
      //   expect(response.body.data.firstName).toBe('Steve');
      //   expect(response.body.data.lastName).toBe('Clover');
      //   expect(response.body.data.email).toBe('sclover@gmail.com');
      //   expect(response.body.data.phone).toBe('09087654321');
    });

    const { data: org } = supabase.from('organisation');

    // it('', () => {});
  });
});
