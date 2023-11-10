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
  
    try{ connection.query("SELECT * FROM user_profile", (err, results, fields) => {
        if (err){
            console.log(err);
            return res.status(400).send();
        }
        res.status(200).json(results);
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
    const {register_ID, Name, Gender, email, password, About_user, Profile_pic, DOB, YES_UID} = req.body;
    try{
            connection.query(
                "INSERT INTO user_profile(register_ID, Name, Gender, email, password, About_user, Profile_pic, DOB, YES_UID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [register_ID, Name, Gender, email, password, About_user, Profile_pic, DOB, YES_UID],
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
//@route GET /api/user/read/single/:email
//@access public
const getUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    try{ 
        connection.query("SELECT * FROM user_profile WHERE email = ?",[email], (err, results, fields) => {
        if (err){
            console.log(err);
            return res.status(400).send();
        }
        res.status(200).json(results);
    })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
});


//@desc update a user
//@route PUT /api/user/:id
//@access public
const updateUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    const newAbout_user = req.body.newAbout_user
    try{ 
        connection.query("UPDATE user_profile SET About_user = ? WHERE email = ?",[newAbout_user, email], (err, results, fields) => {
        if (err){
            console.log(err);
            return res.status(400).send();
        }
        res.status(200).json("message: about user has updated successfully");
    })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//@desc DELETE a user
//@route DELETE /api/user/:id
//@access public
const deleteUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    
    try{ 
        connection.query("DELETE FROM register WHERE email = ?",[email], (err, results, fields) => {
        if (err){
            console.log(err);
            return res.status(400).send();
        }
        if (results.affectedRows == 0){
            return res.status(404).json("No user that has the email");
        }
        return res.status(200).json("User has been deleted successfully");
    })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = {
    getallUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser};