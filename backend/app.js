const express = require('express');
const app = express();
module.exports = app;
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({ credential: true, origin: 'http://localhost:3000' }));
app.use(express.json());

const authRouter = require('./routes/authRoutes');
app.use('/api/v1/auth', authRouter);

const faultsRouter = require('./routes/faultsRoutes');
app.use('/api/v1/faults', faultsRouter);

const usersRouter = require('./routes/usersRoutes');
app.use('/api/v1/users', usersRouter);

app.use((req, res, next) => {
  req.creationTime = new Date().toISOString();
  next();
});
