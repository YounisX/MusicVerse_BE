import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './../../.env') })
import cloudinary from 'cloudinary';

console.log(process.env.API_KEY);
cloudinary.v2.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME,
    secure: true
})

export default cloudinary.v2;