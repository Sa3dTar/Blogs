const jwt = require('jsonwebtoken')


const generateUserJwt = (payload)=>{

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : '1y'})


}

const generateAdminJWT = (payload)=>{

    return jwt.sign(payload , process.env.JWT_SECRETE_KEY , {expiresIn : '1y'})

}


const SUBSCRIPTION_PERIOD_DAYS = {
    '1 month': 30,
    '3 months': 90,
    '6 months': 180,
    '9 months': 270,
    '1 year': 365
  };
  
const createJwtWithSubscription = (user, subscriptionType) => {
    const periodInDays = SUBSCRIPTION_PERIOD_DAYS[subscriptionType];
    if (!periodInDays) {
      throw new Error('Invalid subscription type');
    }
  
    const subscriptionExpiresAt = Date.now() + periodInDays * 24 * 60 * 60 * 1000;
  
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      subscriptionExpiresAt
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  
    return token;
  };
  
module.exports= {
    generateAdminJWT,
    generateUserJwt,
    createJwtWithSubscription
}