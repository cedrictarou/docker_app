const express = require('express');
const router = express.Router();
const db = require('mysql2');

const connection = db.createConnection({
  host: 'mydb',
  user: 'root',
  password: 'root',
  database: 'test_db',
});
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
