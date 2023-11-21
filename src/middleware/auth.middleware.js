import User from "../../DB/Models/user/User.model.js";
import { verifyToken } from "../utils/generateTokens.js";

export const roles = {
  admin: "admin",
  user: "user",
  artist: "artist",
};
 
const auth = (roles = []) => {
    return async(req, res, next) => {
      const { authorization } = req.headers;
      if (!authorization.startsWith(process.env.BEARER_KEY)) {
        res.status(401).send({ message: "Unauthorized" });
      }
      const token = authorization.split(process.env.BEARER_KEY)[1];
      if (!token) {
        return next(new Error("invalid Token", { cause: 401 }));
      }
      //something may result wrong cause token is not passed as obj
      const decoded = verifyToken({ token });
      if (!decoded.userId) {
        return next(new Error("invalid Token payload", { cause: 401 }));
      }
      const user =await User.findById(decoded.userId);
      if (!user) {
        return next(new Error("user doesn't exist", { cause: 401 }));
      }
      if (!roles.includes(user.rolesole) && user.role == decoded.role) {
        return next(new Error("not authenticated user", { cause: 402 }));
      }
      req.user = user; // Attach the user object to the request for further use
      return next();
    };
 
};

export default auth;
 