
export const AsyncHandler = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch((error) => {
       return next(new Error(error,{cause:500}))
      });
    };
  };
  
  
  export const globalErrorHandling  = (err,req,res,next)=>{
      if(err){
  if(process.env.MOOD=='DEV'){
    console.log({error:err.message, stack:err.stack});
      return res.status(err.cause||500).json({messag:'catch error',error:err.message,stack:err.stack})
  }
  else{
      return res.status(err.cause||500).json({messag:'catch error'},err.message)
  }
  }
  }