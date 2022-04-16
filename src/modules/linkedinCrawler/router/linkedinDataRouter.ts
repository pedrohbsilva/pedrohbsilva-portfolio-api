import { Router } from 'express';
import linkedinDataController from '../useCases/linkedinCrawler/linkedinCrawlerController';

const linkedinRoutes = Router();

linkedinRoutes.get('/getDataProfile', linkedinDataController.getData);

export default linkedinRoutes;
