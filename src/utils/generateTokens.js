import jwt from 'jsonwebtoken'

export const generateToken = ({payload,secertKey=process.env.SECRET_KEY,expiresIn=60*60*60}={})=>{
    const token = jwt.sign(payload,secertKey,{expiresIn:parseInt(expiresIn)})
return token
}


export const verifyToken = ({token,secertKey=process.env.SECRET_KEY}={})=>{
    const decoded = jwt.verify(token,secertKey);
    return decoded;
}