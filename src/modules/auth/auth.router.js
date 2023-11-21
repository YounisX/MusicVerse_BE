import { Router } from "express";

import * as authController from "./auth.controller.js";
import { validation } from "../../middleware/validation.middileware.js";
import * as validators from './auth.validation.js';
const router = Router();


router.post("/signup",validation(validators.signupSchema), authController.signup);
router.get('/confirmEmail/:token',authController.confirmEmail)
router.get('/confirmEmail/:token',authController.confirmEmail)
router.post('/login',validation(validators.loginSchema),authController.login)

export default router; 