import { extname, join } from 'path';
import { ulid } from 'ulid';
import { diskStorage as multerDiskStorage } from 'multer';

export const diskStorage = multerDiskStorage({
  destination: join(__dirname, '../../media'),
  filename: function (req, file, cb) {
    cb(null, ulid() + extname(file.originalname));
  },
});
