const db = require('../models');
var express = require('express');
var router = express.Router();
var JSONAPISerializer = require("json-api-serializer");
var Serializer = new JSONAPISerializer();
const {catchHandler} = require('../const/commonHandler');

Serializer.register("subtasks", {
  blacklist: ["updatedAt", "TodoId"]
});
Serializer.register('todos', {
  topLevelMeta: function(data) {
    return {total: data.length};
  },
  relationships: {
    subtasks: {
      type: "subtasks"
    }
  }
});


Serializer.register('todo');

router.get('/', async function(req, res) {
  try {
    const todos = await db.Todo.findAll({
      attributes: [
        'id',
        'title',
        'status',
        ['created_at', 'created_at']
      ],
      order: [
        ['created_at', 'ASC']
      ],
      include: {
        model: db.Subtask,
        as: 'subtasks',
        attributes: [
          'id',
          'title',
          'status',
          ['created_at', 'created_at'],
        ],
        order: [
          ['created_at', 'ASC']
        ],
        separate: true
      }
    })
      .catch(catchHandler('db.Todo.findAll'));
    if (todos.errors) return res.status(400).send()

    const dataValues = [];
    todos.forEach(async t => {
      if (t.subtasks.length > 0) {
        const subTasksDataValue = [];
        t.subtasks.forEach(s => {
          subTasksDataValue.push(s.dataValues)
        });
        t.dataValues.subtasks = subTasksDataValue;
      }
      dataValues.push(t.dataValues)
    })

    return Serializer.serializeAsync('todos', dataValues, null)
      .then((result) => {
        return res.json(result);
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('list todo internal error: ', e)
    return res.status(500).json()
  }
});

router.post('/', async function(req, res) {
  try {
    const title = req.body && req.body.title;

    const result = await db.Todo.create(
      { title: title }
    )
      .catch(catchHandler('db.Todo.create'));
    if (result.errors) return res.status(400).send()

    const newTodo = await db.Todo.findOne({
      where: { id: result.id },
      attributes: ['id', 'title', 'status', ['created_at', 'created_at']]
    })
      .catch(catchHandler('db.Todo.create'));
    if (newTodo.errors) return res.status(400).send()
      
    return Serializer.serializeAsync('todo', newTodo.dataValues, null)
      .then((result) => {
        return res.status(201).json(result);
      });

  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('create todo internal error: ', e)
    return res.status(500).json()
  }
});

router.patch('/:id', async function(req, res) {
  try {
    const id = req.params && req.params.id;
    const status = req.body && req.body.status;
    const result = await db.Todo.update(
      { status: status },
      {
        where: { id: id}
      })
      .catch(catchHandler('db.Todo.update'));
    if (result.errors) return res.status(400).send()

    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('patch todo internal error: ', e)
    return res.status(500).json()
  }
});

module.exports = router;
