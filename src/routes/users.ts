import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { authenticate, checkRole } from '../middleware/authenticate';

const router = Router();

router.get('/me', authenticate, usersController.getUser);
router.get(
  '/',
  authenticate,
  checkRole(['admin', 'super']),
  usersController.getAll
);
router.post('/', usersController.createUser);
router.post('/login', usersController.login);
router.delete('/me/token', authenticate, usersController.logout);
router.patch('/me', authenticate, usersController.patchMe);
router.get(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  usersController.getByUserID
);
router.patch(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  usersController.patchByUserID
);
router.delete(
  '/:id',
  authenticate,
  checkRole(['admin', 'super']),
  usersController.removeById
);

export default router;
