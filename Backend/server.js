const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const session = require("express-session");
// const bodyParser = require('body-parser');

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true})
    );

const port = process.env.PORT || 3306;

app.use('/api/admin', require("./routes/adminRoute"));
app.use('/api/user', require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port, ()=> {
    console.log('Server runing on port ' + port);
});