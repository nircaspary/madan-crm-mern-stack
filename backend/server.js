const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

// MongoDB DB connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`DB "${process.env.DATABASE_NAME}" Connected successfully`)
  );

// Run Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`CRM Application listening on port ${port}...`);
});
