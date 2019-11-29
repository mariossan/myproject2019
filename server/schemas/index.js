const mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost/espotifai")
mongoose.connect(
    "mongodb+srv://mariossan:Escom2121@cluster0-jnx8r.mongodb.net/totransferme?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection

db.once("open", function(){
    console.log("Base de datos abierta!")
})  

const User          = require("./User")
const Upload      = require("./Upload")

module.exports = {
    User,
    Upload
}

