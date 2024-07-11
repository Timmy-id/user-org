const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./api/auth/auth.route');
const userRoutes = require('./api/user/user.route');
const organisationRoutes = require('./api/organisation/organisation.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) =>
  res.status(200).json({ status: 'success', message: 'API working' }),
);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organisations', organisationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
