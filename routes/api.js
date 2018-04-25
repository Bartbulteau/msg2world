var express = require('express');
var router = express.Router();

/* Fake Database */
var JsonDB = require('node-json-db');
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
var db = new JsonDB("database", true, true);

/* Default GET */
router.get('/', function(req,res, next) {
  res.send('M2W: Please go to /api/messages to get messages');
});

/* GET all messages. */
router.get('/messages', function(req, res, next) {
  res.json(db.getData('/messages'));
});

/* POST one message */
router.post('/message', function(req, res, next) {
  try {
    db.push('/messages[]', req.body);
    res.json(db.getData('/messages'));
  } catch (e) {
    console.error(e);
  }
});

/* DELETE message with id */
router.delete('/message/:id', function(req, res, next) {
  try {
    db.delete('/messages[' + req.params.id + ']');
    res.json(db.getData('/messages'));
  } catch (e) {
    console.error(e);
  }
});
  

module.exports = router;
