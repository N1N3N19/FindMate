import express  from "express";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "findmate"
})

app.get("/",(req,res)=>{
    res.json("hello this is the back")
})

app.listen(3306, () =>{
    console.log("Connected to backend!")
})