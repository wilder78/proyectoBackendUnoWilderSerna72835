import multer from 'multer'
import { config } from '../config/index.js'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, config.dirname + '/public/image')
  },
  filename: function (req, file, callback) {
    const fileName = file.originalname.split('.')[0]
    const extension = file.originalname.split('.').pop()
    callback(null, `${fileName}-${Date.now()}.${extension}`)
  },
})

export const multerUploaderMiddleware = multer({ storage })
