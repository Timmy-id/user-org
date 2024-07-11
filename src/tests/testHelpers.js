const { supabase } = require('../config/db');

payload = {
  email: 'asmith@gmail.com',
  firstName: 'Adam',
  lastName: 'Smith',
  password: '123456',
  phone: '09087654321',
};

module.exports = { payload };
