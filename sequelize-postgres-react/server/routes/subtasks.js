const db = require('../models');
var express = require('express');
var router = express.Router();
var JSONAPISerializer = require("json-api-serializer");
var Serializer = new JSONAPISerializer();
const {catchHandler} = require('../const/commonHandler');

Serializer.register('subtask', {
  created_at: 'createdAt',
  blacklist: ["updatedAt"]
});

router.post('/', async function(req, res) {
  try {
    const title = req.body && req.body.title;
    const todo_id = req.body && req.body.todo_id;
  
    const createSubtaskResult = await db.Subtask.create(
      {
        title: title,
        todo_id: todo_id
      })
      .catch(catchHandler('db.Subtask.create'));
    if (createSubtaskResult.errors) return res.status(400).send()

    const newSubtask = await db.Subtask.findOne({
      where: { id: createSubtaskResult.id },
      attributes: ['id', 'title', 'status', 'todo_id', ['created_at', 'created_at']]
    })
      .catch(catchHandler('db.Todo.create'));
    if (newSubtask.errors) return res.status(400).send()
  
    return Serializer.serializeAsync('subtask', newSubtask.dataValues, null)
      .then((result) => {
        res.status(201).json(result);
      });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('create subtask internal error: ', e)
    return res.status(500).json()
  }
});

router.patch('/:id', async function(req, res) {
  try {
    const id = req.params && req.params.id;
    const status = req.body && req.body.status;
    const result = await db.Subtask.update(
      { status: status },
      {
        where: {id: id}
      })
      .catch(catchHandler('db.Subtask.update error'));
    if (result.errors) return res.status(400).send()

    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('patch subtask internal error: ', e)
    return res.status(500).json()
  }
});

module.exports = router;
