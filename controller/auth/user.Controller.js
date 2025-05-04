const users = require('../../models/users/users.model')
const httpStatusText = require('../../utils/httpStatusText')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const generatejwt = require('../../middleware/generatejwt')


const register = async (req , res)=>{
    const {firstName , lastName , email , password , blogs_type , role} = req.body

    const olduser = await users.findOne({email : email})

    if(olduser){
        return res.status(401).json({TextStatus : httpStatusText.FAIL , message : 'the user already exist'})

    }

    const hashedpassword = await bcrypt.hash(password , 10)

    const newuser = new users({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        blogs_type,
        role
    })

     await newuser.save()

    const token = generatejwt({id : newadmin._id , email : newadmin.email , blogs_type : newadmin.blogs_type })

    return res.status(200).json({ TextStatus : httpStatusText.SUCCESS, data : token })

}


const Login = async (req , res)=>{

    const {email , password} = req.body

    if(!email && !password){

        return res.status(400).json({TextStatus : httpStatusText.FAIL , message : "email and password are required"})

    }

    const olduser = await users.findOne({email : email})

    const matchedpassword = await bcrypt.compare(password , olduser.password)

    if(olduser && matchedpassword){

        const token = generatejwt({email : olduser.email , admin_id : olduser._id})

        return res.status(200).json({TextStatus : httpStatusText.SUCCESS, data : token})
    }
    else{
        return res.status(400).json({TextStatus : httpStatusText.FAIL ,message : 'failed login'})
    }

}

const allusers = async (req , res)=>{

    try{

        let query = req.query

        let page = query.page

        let skip = (page - 1) * 6

        const users = await users.find({} , {'password' : false}).limit(6).skip(skip)

        res.status(200).json({TextStatus : httpStatusText.SUCCESS, data : users})


    }catch(err){
        res.status(500).json({TextStatus : httpStatusText.ERROR , message : err.array()})
    }

}


module.exports ={
    Login,
    register,
    allusers
}