exports.errorMiddleware = (err,req,res,next) =>{
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 505;
  return res.status(err.statusCode).json({
    success : false,
    message : err.message
  })
}