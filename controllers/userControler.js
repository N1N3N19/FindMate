const asyncHandler = require("express-async-handler");
const mysql = require('mysql');

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

//@desc get all user
//@route GET /api/user
//@access public
const getallUsers =  asyncHandler(async(req,res) => {
    res.status(200).json({message: "Get all info"});
    try{ connection.query("SELECT * FROM users", (err, results, fields) => {
        if (err){
            console.log(err);
            return res.status(400).send();
        }
        req.status(200).json(results);
    })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//@desc Create a user
//@route POST /api/user
//@access public
const createUser = asyncHandler(async(req,res) => {
    console.log("The request body is :", req.body);
    const {Name, Gender, email, About_user, Profile_pic, DOB, Phone} = req.body;
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
    if( !Name || !email || !DOB){
        res.status(400);
        throw new Error("There are some informations you forgot to fill");
    }
    
});

//@desc get a user
//@route GET /api/user/:id
//@access public
const getUser = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'Get user for ' + req.params.id});
});


//@desc update a user
//@route PUT /api/user/:id
//@access public
const updateUser = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'Update user for ' + req.params.id});
});


//@desc DELETE a user
//@route DELETE /api/user/:id
//@access public
const deleteUser = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'Delete user for ' + req.params.id});
});

module.exports = {
    getallUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser};