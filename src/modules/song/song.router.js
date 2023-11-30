import { Router } from "express";
// import { upload } from '../../utils/multer.js';
import * as songController from "./song.controller.js";
import { cloudUpload } from "../../utils/multer.cloud.js";
import auth from "../../middleware/auth.middleware.js";
import { upload } from "../../utils/multer.js";
const router = Router();

// router.post(
//   "/upload-locally",
//   auth(),
//   upload.fields([
//     { name: "audio", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//   ]),
//   songController.createSong
// );
router.post(
  "/upload",
  auth(),
  cloudUpload().fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  songController.createSong
);

router.get('/songList',auth(),songController.getSong)

router.get('/play/:songId',songController.streamSong)

// router.get('/shit',songController.getShit);

export default router;
