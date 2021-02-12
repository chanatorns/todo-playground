var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var todosRouter = require('./routes/todos');
var subtasksRouter = require('./routes/subtasks');

var app = express();

var db = require('./models');
(async () => {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
})()
db.sequelize.sync();

app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter);
app.use('/subtasks', subtasksRouter);

module.exports = app;
