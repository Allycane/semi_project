import express from 'express';
import * as controller from '../controller/detail.js';

const router = express.Router();

// router.get('/:id', controller.getDetailInfo);
router.get('/review', controller.getReview);

export default router;