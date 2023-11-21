const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      res.send(err);
    } else {
      const query = 'INSERT INTO admin (username, password) VALUES (?, ?)';

      db.query(query, [username, hash], (err, result) => {
        if (err) {
          res.send(err);
        } else {
          console.log('Admin inserted successfully');
          res.send({message: "Admin added"});
        }
      });
    }
  });
});

app.listen(3003, () => {
  console.log("Connected to backend!");
});


app.post('/login', (req, res) => {
  const { loginusername, loginpassword } = req.body;
  const query = 'SELECT password FROM admin WHERE username = ?';

  db.query(query, [loginusername], (err, result) => {
    if (err) {
      console.log(err); 
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(loginpassword, result[0].password, (error, response) => {
        if (error) {
          console.log(error); 
        }
        if (response) {
          res.send({ message: "Login Successful" });
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.get('/getusers', (req, res) => {
  const query = 'SELECT * FROM user_profile';

  db.query(query, (err, result) => {
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

app.get('/getmatched', (req, res) => {
  const query = 'SELECT * FROM matched';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.delete('/users/:user_ID', (req, res) => {
  const query = "DELETE FROM user_profile WHERE user_ID = ?";
  const user_ID = req.params.user_ID;

  db.query(query, user_ID, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: 'User deleted successfully' });
    }
  });
});

app.delete('/delfeedback/:feedback_ID', (req, res) => {
  const query = "DELETE FROM feedback WHERE feedback_ID = ?";
  const feedback_ID = req.params.feedback_ID;

  db.query(query, feedback_ID, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: 'Feedback deleted successfully' });
    }
  });
});



app.get('/getInterests', (req, res) => {
  const query = 'SELECT * FROM interested';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send(result);
    }
  });
});