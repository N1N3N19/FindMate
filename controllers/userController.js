const asyncHandler = require("express-async-handler");
const mysql = require('mysql');
const fetchDataFromDatabase = require('../models/userModel')

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'findmate',
        port: 3306
    }
)

connection.connect((err)=>{
    if (err){
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

//@desc Create a user
//@route POST /api/user/regist
//@access public
const registUser = asyncHandler(async(req,res) => {
    const {Name, Gender, email, About_user, Profile_pic, DOB, Phone} = req.body;
    if( !Name || !email || !password || !DOB){
        res.status(400);
        throw new Error("There are some informations you forgot to fill");
    }
    const userAvailable = await fetchDataFromDatabase.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("There are some informations you forgot to fill");
    }
    try{
            connection.query(
                "INSERT INTO user_profile(Name, Gender, email, About_user, Profile_pic, DOB, Phone) VALUES(?, ?, ?, ?, ?, ?, ?)",
                [Name, Gender, email, About_user, Profile_pic, DOB, Phone],
                (err, results, fields) => {
                    if (err){
                        console.log("Error while inserting a user into the database", err);
                        return res.status(400).send(); 
                    }
                    return res.status(201).json({ message: "New user successfully created!"});
                }
            )
    } catch(err){
        console.log(err);
        return res.status(500).send;
    }
    
    
});

//@desc Login a user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async(req,res) => {
    const {Name, Gender, email, password, About_user, Profile_pic, DOB, Phone} = req.body;
    try{
            connection.query(
                "INSERT INTO user_profile(Name, Gender, email, password, About_user, Profile_pic, DOB, Phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                [Name, Gender, email,password, About_user, Profile_pic, DOB, Phone],
                (err, results, fields) => {
                    if (err){
                        console.log("Error while inserting a user into the database", err);
                        return res.status(400).send(); 
                    }
                    return res.status(201).json({ message: "New user successfully created!"});
                }
            )
    } catch(err){
        console.log(err);
        return res.status(500).send;
    }
    if( !Name || !email || !DOB){
        res.status(400);
        throw new Error("There are some informations you forgot to fill");
    }
    
});
