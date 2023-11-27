
import multer from 'multer'

export function cloudUpload() {
    const storage = multer.diskStorage({})


    const upload = multer({storage})
    return upload ; 
}