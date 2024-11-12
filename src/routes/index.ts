import express from 'express';
import { router as accountRouter } from './account.route';
import { postRouter } from './post.route';
const router = express.Router();

router.use('/account', accountRouter);
router.use('/post', postRouter);

export default router;
