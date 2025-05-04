const mongoose = require('mongoose')


const premiumblogSchema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    blog : {
        type: String,
        required : true,
        unique : true,
        validator : [validator.isEmail, 'email is required']
    },
    author:{
            type: mongoose.Schema.ObjectId,
            ref: 'user'
    },
    blogs_type : {
        type : String,
        enum : ['political' , "economics"],
        required : true 
    }
})

const premiumblogs = mongoose.model('premiumBlogs', premiumblogSchema)

module.exports = premiumblogs