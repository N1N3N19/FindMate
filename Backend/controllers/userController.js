
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const jwt = require("jsonwebtoken");

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
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const registerResult = await connection.query(registerQuery, [email, hashPassword, hashPassword]);
      const registerID = registerResult[0].insertId;

      const userProfileResult = await connection.query(userProfileQuery, [registerID, email, hashPassword]);

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
        'INSERT INTO user_profile (Name, Gender, About_user, Profile_pic, DOB) VALUES (?, ?, ?, ?,?)',
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

const loginUser = async(req,res) => {
  const {email, password} = req.body;
  try{
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE email = ?', [email]);
    const user = rows[0];
    if (!email ||!password ){
      res.status(400);
      throw new Error("All this are mandatory");
    }  

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1m' });
    res.status(200).json({ token });
  } catch(error){
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
 
};
  const currentUser = async(req,res) =>{
    
      res.json({message: "current user information"});
  
  };
module.exports = {checkUser,registUser,loginUser,currentUser}

//@desc current user info
//@route POST /api/user/current
//@access private