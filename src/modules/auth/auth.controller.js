import User from "../../../DB/Models/user/User.model.js";
import { AsyncHandler } from './../../utils/errorHandling.js';
import { generateToken, verifyToken } from './../../utils/generateTokens.js';
import sendMail from './../../utils/email.js';
import { hash, compare } from '../../utils/hash&compare.js';


export const signup = AsyncHandler(async(req,res,next)=>{ 
    const {email,userName,password} = req.body; 

    //check if user exist 
    const user = await User.findOne({email})
    if(user){
        return next(new Error("this Email Already Registered", { cause: 400 }));
    }

// verify Email (optional for user) 
const token = generateToken({payload:{email},expiresIn:60*60});
const refreshToken  = generateToken({payload:{email},expiresIn:60*60*24});
const link  = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
const refreshLink  = `${req.protocol}://${req.headers.host}/auth/refreshToken/${refreshToken}`;

const html  = ` 
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body>
  <h1>Hello ${userName},</h1>
  <p>Thank you for signing up for our music service.</p>
  <p>Please click the button below to verify your email:</p>
  <a href="${link}">
    <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">
      Verify Email
    </button>
  </a>
  <p>If the button above doesn't work, you can also copy and paste the following link in your browser:</p>
  <a href="${link}">${link}</a>
  <br><br>
  <p>If you need to refresh your access token, you can click the link below:</p>
  <a href="${refreshLink}">click here</a>
  <br><br>
  <p>If you did not sign up for our music service, please ignore this email.</p>
  <p>Thank you,</p>
  <p>The Music Service Team</p>
</body>
</html>
`
const sentEmail = await sendMail({to:'orabix10@gmail.com',subject:'verify Account',html})
if(!sentEmail){
    return next(new Error('email not sent'),{cause:400});
}
//hashing the password and creating user 
const hashPassword = hash({plaintext:password,salt:10})
const createdUser = await User.create({password:hashPassword,userName,email})

return res.status(200).json({ message: 'User created successfully. Please check your email.', user: createdUser._id });
}); 

export const confirmEmail = AsyncHandler(async(req,res,next)=>{
  const {token} = req.params;

  const {email} = verifyToken({token});
  console.log(email)

if(!email){
  return next(new Error('invalid Token'),{cause:400})
}
const user = await User.findOneAndUpdate({email:email.toLowerCase()},{emailConfirmation:true},{new:true})
if(!user){
  return next(new Error('not registered account'),{cause:400})
}
else{ 
return res.redirect(`${process.env.LINK}`)
}
})




export const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if the user exists
  if (!user) {
    return next(new Error("Invalid email or password.", { cause: 401 }));
  }
if(!user.emailConfirmation){
  return next(new Error("email not confirmed check email", { cause: 401 }));
}
  // Check if the provided password matches the stored hashed password
  const isPasswordValid = compare({ plaintext: password, hashValue: user.password });

  if (!isPasswordValid) {
    return next(new Error("Invalid email or password.", { cause: 401 }));
  }
  const tokenPayload = { userId: user._id, role: user.roles,name:user.userName };
  const token = generateToken({payload:tokenPayload},{
    expiresIn: 60*60*24
  });
console.log(token);

  user.status = true;
  await user.save();


  return res.json({ message:'Success',token });
});
 