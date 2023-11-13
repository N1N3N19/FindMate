const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();


app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3306;

app.use('/api/admin', require("./routes/adminRoute"));
app.use('/api/user', require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port, ()=> {
    console.log('Server runing on port ' + port);
});