// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         //check this folder direction and change it back to userId so it's unique for songs and albums 
//       const dynamicPath = path.join(__dirname, 'uploads', 'req.user._id'); // Assuming user ID is available in req.user
//       cb(null, dynamicPath);
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });
  
//   // Filter function to allow only audio files with mp3 mimetype
//   // const fileFilter = (req, file, cb) => {
//   //   if (file.mimetype == 'audio/mp3') {
//   //     cb(null, true);
//   //   } else {
//   //     cb(new Error('Only MP3 audio files are allowed!'), false);
//   //   }
//   // };
  
//   export const upload = multer({ storage });