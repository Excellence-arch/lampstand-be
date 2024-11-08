import express from 'express';
import auth from '../middlewares/auth';
import { getAllUsers, getUser } from '../controllers/admin.controller';
import { getProfile } from '../controllers/account.controller';

const router = express.Router();

router.get('/users', auth(['admin']), getAllUsers);
router.get('/users/:id', auth(['admin']), getUser);

router.get('/profile', auth(['user']), getProfile);

export default router;
