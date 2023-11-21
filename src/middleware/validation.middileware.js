import joi from 'joi'
import { Types } from 'mongoose'

const validateObjectId = (value,helper)=>{
    return Types.ObjectId.isValid(value)?true:helper.message('invalid-objectId')
}


export const generalFields = { 
    email:joi.string().email({
        minDomainSegments:2,
        maxDomainSegments:4,
        tlds:{allow:['com','net','io']}
    }).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    id:joi.string().custom(validateObjectId),
 headers:joi.string().required()   
}

export const validation = (schema)=>{
    return (req,res,next)=>{
const {error} = schema.validate(req.body,{abortEarly:false})
if(error?.details){
return res.json({message:'Validation Error',validationResult:error?.details})
}
return next();
    }
}