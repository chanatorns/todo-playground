var db = require('../models');
(async () => {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection has been established successfully.');
    await db.Subtask.destroy({where: {}})
    await db.Todo.destroy({where: {}})
    // eslint-disable-next-line no-console
    console.log("All table is destroyed :O")
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
})()


