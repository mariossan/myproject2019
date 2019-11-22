const { Schema, model, Types } = require('mongoose')


const UserSchema = new Schema({
    email:  { 
        type: String,
        required: [true, "El correo es obligatorio"] 
    },
    password:  { 
        type: String,
        required: [true, "El password es obligatorio"]
    },
    created_at: { 
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "guest"
    }
})

const User      = model( "User", UserSchema )
module.exports  = User