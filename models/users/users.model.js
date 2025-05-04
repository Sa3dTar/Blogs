const mongoose = require('mongoose')

const validator = require('validator')

const role = require('../../utils/roles')

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true,
        validator : [validator.isEmail, 'email is required']
    },
    password : {
        type: String,
        required : true 
    },
    blogs_type : {
        type : String,
        enum : ['political' , "economics" , 'sport' , 'cinema' , 'celebrities', 'socialize', 'none'],
        required : true 
    },
    role : {
        type: String,
        enum : [role.USER , role.MANAGER , role.ADMIN , role.JOURNALIST],
        required : true
    }
})

const users = mongoose.model('users', userSchema)

module.exports = users