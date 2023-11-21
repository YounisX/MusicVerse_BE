
import multer from 'multer'

export function cloudUpload() {
    const storage = multer.memoryStorage({})


    const upload = multer({storage})
    return upload ; 
}