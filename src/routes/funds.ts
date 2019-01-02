import { Router } from 'express';
import { authenticate, checkRole } from '../middleware/authenticate';
import fundsController from '../controllers/funds.controller';

const router = Router();

router.get('/', authenticate, fundsController.getByQuery);
router.get('/:id', authenticate, fundsController.getByID);
router.post(
  '/',
  authenticate,
  checkRole(['admin', 'super']),
  fundsController.post
);
router.patch(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  fundsController.patch
);
router.delete(
  '/',
  authenticate,
  checkRole(['admin', 'super']),
  fundsController.deleteAll
);
router.delete(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  fundsController.deleteById
);

export default router;
