const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();


app.use(express.json());




const port = process.env.PORT || 3306;


app.use('/api/user', require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port, ()=> {
    console.log('Server runing on port ' + port);
});