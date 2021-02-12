'use strict';
const {Model} = require('sequelize');
const { attributes } = require('../const/attributes');

module.exports = (sequelize, DataTypes) => {
  class Subtask extends Model {
    static associate(models) {
      models.Todo.hasMany(models.Subtask, {as: 'subtasks'})
      models.Subtask.belongsTo(models.Todo)
    }
  }

  Subtask.init({
    title: DataTypes.STRING,
    status: attributes(DataTypes).status,
    todo_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subtask',
    underscored: true
  });

  return Subtask;
};