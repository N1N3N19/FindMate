const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the username"],
    },
    gender:{
        type: String,
        required: [false],
    },
    email:{
        type: String,
        required: [true, "Please add your email"],
    },
})