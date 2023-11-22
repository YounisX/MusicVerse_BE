import  { Router } from 'express'
// import { upload } from '../../utils/multer.js';
import * as songController from './song.controller.js'
import { cloudUpload } from '../../utils/multer.cloud.js';
import auth from '../../middleware/auth.middleware.js';
const router = Router();

router.post('/upload',auth(['user']),cloudUpload().fields([
    {name:'audio',maxCount:1},
    {name:'image',maxCount:1}
]),songController.createSong);
// router.get('/shit',songController.getShit);

export default router;  