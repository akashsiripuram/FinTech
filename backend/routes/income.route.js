import express from 'express';
import { authMiddleware } from '../controllers/auth.controller.js';
import { addIncome,getUserWithIncome } from '../controllers/income.controller.js';

const router = express.Router();
router.post("/add",authMiddleware,addIncome);
router.get("/",authMiddleware,getUserWithIncome);



export default router;