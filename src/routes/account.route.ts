import express from 'express';
import auth from '../middlewares/auth';
import { getAllUsers, getUser } from '../controllers/admin.controller';
import { getProfile, login, register } from '../controllers/account.controller';
import { AccountRole } from '../models/account.model';

const router = express.Router();

router.get('/users', auth([AccountRole.ADMIN]), getAllUsers);
router.get('/users/:id', auth([AccountRole.ADMIN]), getUser);

router.get('/profile', auth([AccountRole.USER]), getProfile);

router.post('/register', register);
router.post('/login', login);

export { router };
