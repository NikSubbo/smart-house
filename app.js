const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const applianceRouter = require('./routes/appliance');
// const useErrorHandlers = require('./middleware/error-handlers');
require('./middleware/db-connect');
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', indexRouter);
app.use('/api/appliance', applianceRouter);
// useErrorHandlers(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000,
  () => console.log('Server is running...'));

module.exports = app;
