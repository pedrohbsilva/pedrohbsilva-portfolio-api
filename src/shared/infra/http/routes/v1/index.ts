import express from 'express';
import linkedinRoutes from '../../../../../modules/linkedinCrawler/router/linkedinDataRouter';

const router = express.Router();
router.use('/linkedin', linkedinRoutes);

export default router;
