const jwt = require('jsonwebtoken')
const httpStatusText = require('../utils/httpStatusText')

const verifyToken = (req , res , next)=>{

    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if(!authHeader){

        return res.status(400).json({TextStatus : httpStatusText.FAIL})
    }

    try{

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)

        

        next()

    }catch(err){

        const errmsg = res.status(500).json({message : err})

        next(errmsg)

    }

}


const verifyTokenWithSubscription = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Token not provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.subscriptionExpiresAt && decoded.subscriptionExpiresAt < Date.now()) {
        return res.status(403).json({ message: 'Your subscription has expired' });
      }
  
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
  

module.exports = verifyToken