import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import songRouter from "./modules/song/song.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import cors from "cors";


const initApp = (app, express) => {

  app.use(express.json({}));

  app.use(cors());

  app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "MusicVerse home API" });
  });
  // app.use(`/auth`, authRouter);
  app.use(`/user`, userRouter);
  app.use(`/auth`, authRouter);
  app.use('/song',songRouter)
 
  app.all("*", (req, res, next) => {
    res.status(404).send("In-valid Routing Please check url  or  method");
  });
  app.use(globalErrorHandling);
  connectDB();
};

export default initApp;
