import express from 'express';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', auth(['admin']));
router.get('/users/:id', auth(['admin']));

router.get('/profile', auth(['user']));

export default router;
