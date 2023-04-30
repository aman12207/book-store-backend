const jwt = require('jsonwebtoken')

const sendCookies = (user,res,statusCode,message)=>{
  const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
  res.status(201).cookie("token",token,{
    httpOnly : true,
    maxAge : 60*60*1000,         // cookie will expire after 1hr
  }).json({
    success : true,
    message
  })
}

module.exports = sendCookies