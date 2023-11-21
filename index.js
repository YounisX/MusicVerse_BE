import express from 'express'
import initApp from './src/app.router.js'
import dotenv from 'dotenv'
dotenv.config();
const app =express();
initApp(app,express)




app.listen(process.env.PORT,()=>{
    console.log(`Music is running on Port ${process.env.PORT}`);
})
