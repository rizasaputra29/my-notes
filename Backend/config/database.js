const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("mongoose is connected");})
    .catch((error)=>{console.log(`error while connecting with db ${error}`);})
}

module.exports = dbConnect ;
