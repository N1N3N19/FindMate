const asyncHandler = require("express-async-handler");
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'findmate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// @desc Create a user
// @route POST /api/user/regist
// @access public
const checkUser = async (req, res) => {
  try {
    const { email, password, cfPassword} = req.body;
    
    if (!email || !password || !cfPassword ) {
      res.status(400).json({ message: "Some required information is missing" });
      return;
    }

    if (password !== cfPassword) {
      res.status(400).json({ message: "Both passwords don't match" });
      return;
    }

    const [existingUser] = await pool.query('SELECT * FROM register WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const registerQuery = 'INSERT INTO register (email, password, confirm_password) VALUES (?, ?, ?)';
    const userProfileQuery = 'INSERT INTO user_profile (register_ID, email, password) VALUES (?, ?, ?)';

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const registerResult = await connection.query(registerQuery, [email, password, cfPassword]);
      const registerID = registerResult[0].insertId;

      const userProfileResult = await connection.query(userProfileQuery, [registerID, email, password]);

      await connection.commit();

      res.status(201).json({ message: "User registered and profile created successfully!" });
    } catch (error) {
      await connection.rollback();
      console.error('Error creating user:', error);
      res.status(500).send();
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send();
  }
};


//@desc Regis a user
//@route POST /api/user/Regis
//@access public
const registUser = async (req, res) => {
    try {
      const { Name, Gender, About_user, Profile_pic, DOB } = req.body;
      if (!Name || !DOB) {
        res.status(400).json({ message: "Some required information is missing" });
        return;
      }
  
      const [result] = await pool.query(
        'INSERT INTO user_profile (Name, Gender, email, password, About_user, Profile_pic, DOB) VALUES (?, ?, ?, ?, ?, ?,?)',
        [Name, Gender, email, password, About_user, Profile_pic, DOB]
      );
  
      res.status(201).json({ message: "New user successfully created!" });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send();
    }
  };


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

module.exports = {checkUser,registUser,loginUser}