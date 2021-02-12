'use strict';
const {Model} = require('sequelize');
const { attributes } = require('../const/attributes');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init({
    title: DataTypes.STRING,
    status: attributes(DataTypes).status
  }, {
    sequelize,
    modelName: 'Todo',
    underscored: true
  });

  return Todo;
};