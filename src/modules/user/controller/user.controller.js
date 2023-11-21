import User from "../../../../DB/Models/user/User.model.js";
import { AsyncHandler } from './../../../utils/errorHandling.js';


export  const createUser = async(req,res,next) =>{
const data = req.body; 
console.log({...data});

const user = await User.create(data)
res.json({message:'done',user})
}

export const updateUser = AsyncHandler(async (req, res, next) => {
    const { ...data } = req.body; // Get the data object from req.body
    const user = await User.findByIdAndUpdate(
      req.user._id, // Find user by email
      data, // Use the data object directly for updating
      { new: true }
    );
  
    res.json({ message: 'done', user });
  });