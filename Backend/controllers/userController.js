
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const jwt = require("jsonwebtoken");
// const session = require("express-session");


//define loaclstorage in server
const localStorage = require('localStorage');


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
    const sanitizedEmail = email.toLowerCase();
    
    if (!email || !password || !cfPassword ) {
      res.status(400).json({ message: "Some required information is missing" });
      return;
    }

    if (password !== cfPassword) {
      res.status(400).json({ message: "Both passwords don't match" });
      return;
    }
    //TO DO: if user email already exists in database return error
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE email = ?', [sanitizedEmail]);
    const user = rows[0];
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    

    const registerQuery = 'INSERT INTO register (email, password, confirm_password) VALUES (?, ?, ?)';
    const userProfileQuery = 'INSERT INTO user_profile (register_ID, email, password) VALUES ( ?, ?, ?)';
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const registerResult = await connection.query(registerQuery, [sanitizedEmail, hashPassword, hashPassword]);
      const registerID = registerResult[0].insertId;

      const userProfileResult = await connection.query(userProfileQuery, [ registerID, sanitizedEmail, hashPassword]);

      await connection.commit();

      //return user id from database table user_profile
      const [rows] = await pool.query('SELECT * FROM user_profile WHERE email = ?', [sanitizedEmail]);
      const user = rows[0];
    
      const token = jwt.sign({ userProfileResult, sanitizedEmail }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });
      res.status(201).json({token, userID: user.user_ID, email: sanitizedEmail, message: "User registered and profile created successfully!" });
      
      
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
//@route PATCH /api/user/Regis
//@access public
const registUser = async (req, res) => {
 
    try {
      
      
      const { userID, Name, Gender, DOB, avatar  } = req.body;
      
      if (!Name || !DOB || !avatar || !Gender) {
        res.status(400).json({ message: "Some required information is missing" });
        return;
      }
      strDOB = DOB.toString();
       const [result] = await pool.query(
        'UPDATE user_profile SET Name = ?, Gender = ?, Profile_pic = ?, DOB = ? WHERE user_ID = ?',
         [Name, Gender, avatar, DOB, userID]
       );
       
     

      res.status(201).json({  message: "New user successfully created!" });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send();
    }
  };

  //@desc user select a mode
  //@route POST /api/user/mode
  //@acccess private
  const mode = async(req,res) => {
    
    const {userID, mode} = req.body;
    // if id exists in mode table database delete that row and insert new row
    try{
      const [rows] = await pool.query('SELECT * FROM mode WHERE user_ID = ?', [userID]);
      const user = rows[0];
      if (user) {
        const [result] = await pool.query('DELETE FROM mode WHERE user_ID = ?', [userID]);
      }
    } catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
    try{
      const [result] = await pool.query('INSERT INTO mode (user_ID, mode_pref) VALUES (?, ?)', [userID, mode]);
      res.json({userID})
    } catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //@desc update about user
  //@route patch /api/user/about
  //@access private
  const about = async(req,res) => {
    const {userID, About_user} = req.body;
    console.log(About_user);

    try{
      const [result] = await pool.query('UPDATE user_profile SET About_user = ? WHERE user_ID = ?', [About_user, userID]);
      res.json({userID})
    } catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //@desc insert interested of user in database
  //@route post /api/user/interested
  //@access private
  const interested = async(req,res) => {
    const {userID, selectedButtons} = req.body;
    try{
      for (let i = 0; i < selectedButtons.length; i++) {
        const [id] = await pool.query(
          'SELECT ID FROM interested WHERE i_name = ?',
          [selectedButtons[i]]
        );
        const IID = id[0].ID;
        const [result] = await pool.query(
          'INSERT INTO user_interest(UID, IID) VALUES(?, ?)', 
          [userID, IID]);
      }
    } catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  //@desc get all user
  //@route GET /api/user
  //@access private
  const user = async(req,res) => {
    const {userID} = req.body;
    
    try {
      const [rows] = await pool.query('SELECT * FROM user_profile WHERE user_ID = ?', [userID]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

//@desc get all other user
//@route GET /api/user/other
//@access private
const otherUser = async(req,res) => {
  const {userID} = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE user_ID != ?', [userID]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//@desc swipe right user
//@route POST /api/user/swipe
//@access private
const swipe = async(req,res) => {
  const {userID, otherID, swipe_state} = req.body;
  const [rows]  = await pool.query('SELECT * FROM swipe WHERE user_a = ? AND user_b = ?', [otherID, userID]);
  const state = rows[0]?.swipe_state;

  if (state === undefined){
    try {
      const [rows] = await pool.query('INSERT INTO swipe(user_a, user_b, swipe_state) VALUES (?,?,?)', [userID,otherID, swipe_state]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (state === "right"){
    try { 
      const [rows] = await pool.query('INSERT INTO swipe(user_a, user_b, swipe_state) VALUES (?,?,?)', [userID,otherID, swipe_state]);
      const [rows1] = await pool.query('INSERT INTO matched(user_a, user_b) VALUES (?,?)', [userID,otherID]);
      const [rows2] = await pool.query('INSERT INTO matched(user_a, user_b) VALUES (?,?)', [otherID,userID]);
      
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};


//@desc Login a user
//@route POST /api/user/login
//@access public
// TO DO: create session when login


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
    
    if (email && password){
      if(req.session.authenticated){
        res.json({message: "You are already logged in"}); 
        res.json(req.session);
      }}else{
        if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      } else {
        const currentUser = user.user_ID;
        req.session.authenticated = true;
        //store user id in session
        req.session.user = currentUser;
        

      }
    }
      
    const token = jwt.sign({ rows, email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });
    res.status(201).json({ token, userID: user.user_ID, email: email, message: "User logged in successfully!" });
   

  } catch(error){
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
 
};
  const currentUser = async(req,res) =>{
    
      res.json({message: "current user information"});
  
  };



  
    
    

  // TO DO: display user by id from database

  const getUserById = async(req,res) =>{
    try{
      const [rows] = await pool.query('SELECT * FROM user_profile WHERE id != ?', [id]);
      const user = rows[0];
      
      res.status(200).json({ user });
    }
    catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  
  }
module.exports = {checkUser,registUser,loginUser,currentUser, mode, about, user, otherUser,swipe, interested}

//@desc current user info
//@route POST /api/user/current
//@access private