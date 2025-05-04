const mongoose = require('mongoose')


const subscriptionSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.ObjectId,
        required : true
    },
    typeSubscribtion : {
        type: String,
        enum : ['free' , '1 month' , '3 months' , '6 months' , '9 months' , '1 year'],
        required : true
    },
    paymentAcc : {
        type: String,
        enum : [null , ]
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

const subscriptions = mongoose.model('subscriptions', subscriptionSchema)

module.exports = subscriptions