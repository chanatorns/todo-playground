'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'Todos', 'subtasks', Sequelize.ARRAY(Sequelize.STRING));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Todos', 'subtasks');
  }
};
