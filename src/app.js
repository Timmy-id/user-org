const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./api/auth/auth.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger('dev'));

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
