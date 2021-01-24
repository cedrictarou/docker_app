// DBの設定
const db = require('mysql2');

const connection = db.createConnection({
  host: 'mydb',
  user: 'root',
  password: 'root',
  database: 'test_db',
});

module.exports = connection;
