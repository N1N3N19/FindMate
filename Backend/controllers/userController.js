
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
    
    if (!email || !password || !cfPassword ) {
      res.status(400).json({ message: "Some required information is missing" });
      return;
    }

    if (password !== cfPassword) {
      res.status(400).json({ message: "Both passwords don't match" });
      return;
    }
    //TO DO: if user email already exists in database return error
    const [rows] = await pool.query('SELECT * FROM user_profile WHERE email = ?', [email]);
    const user = rows[0];
    if (user) {
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

      //return user id from database table user_profile
      const [rows] = await pool.query('SELECT * FROM user_profile WHERE email = ?', [email]);
      const user = rows[0];
      res.json( {userID: user.user_ID});
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
  const id = req.params.id;
    try {
      
     
      
      const { Name, Gender, DOB, avatar  } = req.body;
      if (!Name || !DOB) {
        res.status(400).json({ message: "Some required information is missing" });
        return;
      }
      strDOB = DOB.toString();
       const [result] = await pool.query(
        'UPDATE user_profile SET Name = ?, Gender = ?, Profile_pic = ?, DOB = ? WHERE user_ID = ?',
         [Name, Gender, avatar, DOB, id]
       );
       
       res.json( {userID: id});

      res.status(201).json({ message: "New user successfully created!" });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send();
    }
  };

  //@desc user select a mode
  //@route POST /api/user/mode


  //@desc get all user
  //@route GET /api/user/feed
  //@access private
  const user = async(req,res) => {
    const {id} = req.params;
    try{
      const [rows] = await pool.query('SELECT * FROM user_profile WHERE id != ?', [id]);
      const user = rows[0];
      
      res.status(200).json({ user });
    }
    catch(error){
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
//@desc get a randomly user to feed
//@route GET /api/user/feed
//@access private
//TO DO feed user by id from database
const feedUser = async(req,res) => {
  const {id} = req.params;
  const user = req.session.user;

  // Get a random user's profile and fetch content based on their preferences
  pool.query('SELECT * FROM user_profile ORDER BY RAND() LIMIT 1', (error, result) => {
    if (error) {
      res.status(500).send('Error retrieving random user profile');
    } else {
      const randomUser = result[0];
      const feedContent = { userId: randomUser.user_ID, content: [] };

      // Fetch content based on user preferences
      // if (randomUser.preferences.includes('sports')) {
      //   pool.query('SELECT * FROM sports_content', (sportError, sportResults) => {
      //     if (sportError) {
      //       res.status(500).send('Error fetching sports content');
      //     } else {
      //       feedContent.content.push({ sports: sportResults });
      //     }
      //   });
      // }

      // if (randomUser.preferences.includes('movies')) {
      //   pool.query('SELECT * FROM movies_content', (movieError, movieResults) => {
      //     if (movieError) {
      //       res.status(500).send('Error fetching movie content');
      //     } else {
      //       feedContent.content.push({ movies: movieResults });
      //     }
      //   });
      // }

      res.json(feedContent);
    }
  });
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
      
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });
    res.status(200).json({ token });
   

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
module.exports = {checkUser,registUser,loginUser,currentUser, feedUser}

//@desc current user info
//@route POST /api/user/current
//@access private