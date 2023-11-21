import { Router } from "express";
import * as userController from './controller/user.controller.js'
import auth, { roles } from "../../middleware/auth.middleware.js";

const app = Router();
app.get('/',(req,res,next)=>{ 
    res.send('this is Home for user')
})
app.post('/create',userController.createUser)
app.put('/update',auth(['user']),userController.updateUser)
// app.delete('/delete',userController.deleteUser)



export default app ; 
