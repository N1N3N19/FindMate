const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'findmate',
  port: '3307'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO admin (username, password) VALUES (?, ?)';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log('User inserted successfully');
      res.send({message: "User added"});
    }
  });
});

app.listen(3003, () => {
  console.log("Connected to backend!");
});


app.post('/login', (req, res) => {
  const { loginusername, loginpassword } = req.body;
  const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';

  db.query(query, [loginusername, loginpassword], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Wrong username/password combination!" });
    }
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM user_profile';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const query = 'SELECT * FROM user_profile WHERE id = ?';
  const id = req.params.id;

  db.query(query, id, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });               
    } else {
      res.send(result);
    }
  });
});   

app.get('/feedback', (req, res) => {
  const query = 'SELECT * FROM feedback';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.get('/feedback/:id', (req, res) => {
  const query = 'SELECT * FROM feedback WHERE id = ?';
  const id = req.params.id;

  db.query(query, id, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });               
    } else {
      res.send(result);
    }
  });
});