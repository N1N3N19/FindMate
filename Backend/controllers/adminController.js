const asyncHandler = require("express-async-handler");
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'findmate',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('Error connecting to MySQL database = ', err);
    } else {
      console.log('MySQL successfully connected!');
      connection.release();
    }
  });

//@desc get all user
//@route GET /api/user
//@access private
const getallUsers =  async(req,res) => {
  
    try{ pool.query("SELECT * FROM user_profile", (err, results, fields) => {
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
};

//@desc Create a user
//@route POST /api/user
//@access private
const createUser = async (req, res) => {
    try {
        console.log("The request body is:", req.body);
        const { register_ID, Name, Gender, email, password, About_user, Profile_pic, DOB, YES_UID } = req.body;

        if (!Name || !email || !DOB) {
            res.status(400).json({ message: "Some required information is missing" });
            return;
        }

        const registerQuery = 'INSERT INTO register (email, password, confirm_password) VALUES (?, ?, ?)';
        const hashPassword = await bcrypt.hash(password, 10);

        const userProfileQuery = "INSERT INTO user_profile(user_ID, register_ID, Name, Gender, email, password, About_user, Profile_pic, DOB, YES_UID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const registerResult = await connection.query(registerQuery, [email, hashPassword, hashPassword]);
        const registerID = registerResult[0].insertId;
    
        const userProfileResult = await connection.query(userProfileQuery, [req.user, registerID, Name, Gender, email, hashPassword, About_user, Profile_pic, DOB, YES_UID]);

        await connection.commit();

        res.status(201).json({ message: "New user successfully created!" });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};



//@desc get a user
//@route GET /api/user/read/single/:email
//@access private
const getUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    try{ 
        pool.query("SELECT * FROM user_profile WHERE email = ?",[email], (err, results, fields) => {
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
//@access private
const updateUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    const newAbout_user = req.body.newAbout_user
    try{ 
        pool.query("UPDATE user_profile SET About_user = ? WHERE email = ?",[newAbout_user, email], (err, results, fields) => {
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
//@access private
const deleteUser = asyncHandler(async(req,res) => {
    const email = req.params.email;
    
    try{ 
        pool.query("DELETE FROM register WHERE email = ?",[email], (err, results, fields) => {
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