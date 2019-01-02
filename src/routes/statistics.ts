import { Router } from 'express';
import { authenticate, checkRole } from '../middleware/authenticate';
import statisticsController from '../controllers/statistics.controller';

const router = Router();

router.get('/', authenticate, statisticsController.getLatest);
router.get('/history', authenticate, statisticsController.getHistory);
router.delete(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  statisticsController.deleteById
);

export default router;
