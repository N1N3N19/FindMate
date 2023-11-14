const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.listen(3002, () =>{
    console.log('Server is running on port 3002')
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'findmate',
})

app.post('/register',(req,res))