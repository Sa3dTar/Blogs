const users = require("../models/users/users.model")

const httpStatusText = require('../utils/httpStatusText')

module.exports = (...role)=>{
    return (req , res ,next)=>{

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                TextStatus: httpStatusText.FAIL, 
                message: 'Unauthorized access' 
            })
        }
        console.log("Authorization Header:", req.headers.authorization);
    

        next()

    }
}