const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
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
    },
    blogs_type : {
        type : String,
        enum : ['political' , "economics" , 'sport' , 'cinema' , 'celebrities', 'socialize'],
        required : true 
    },
    writed_by : {
        type : String,
        required : true 
    }
})

const blogs = mongoose.model('blogs', blogSchema)

module.exports = blogs