import { extname, resolve } from 'path';
import { ulid } from 'ulid';
import { diskStorage as multerDiskStorage } from 'multer';
import { MEDIA_BUCKET } from '../adminjs/adminjs.module';

export const diskStorage = multerDiskStorage({
  destination: MEDIA_BUCKET, //resolve(__dirname, '../../media'),
  filename: function (req, file, cb) {
    cb(null, ulid() + extname(file.originalname));
  },
});
