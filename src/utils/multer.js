import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dynamicPath = path.join(__dirname, 'uploads', "req.user._id");
    if (!fs.existsSync(dynamicPath)) {
      fs.mkdirSync(dynamicPath, { recursive: true });
    }
    cb(null, dynamicPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

  
  export const upload = multer({ storage }); 