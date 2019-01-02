import { Router } from 'express';
import filesController from '../controllers/files.controller';
import { authenticate, checkRole } from '../middleware/authenticate';
import excelProcessor from '../middleware/excelProcessor';
import multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel'
    ) {
      cb(null, true);
    }
    cb(null, false);
  }
});

const router = Router();

router.get(
  '/',
  authenticate,
  excelProcessor.exportFile,
  filesController.getFile
);

router.post(
  '/',
  authenticate,
  checkRole(['admin', 'super']),
  upload.single('file'),
  excelProcessor.importFile,
  filesController.post
);

export default router;
