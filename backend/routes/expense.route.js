import express from 'express';
import { authMiddleware } from '../controllers/auth.controller.js';
import { addExpense,getUserWithExpenses } from '../controllers/expenses.controller.js';

const router = express.Router();
router.post("/",authMiddleware,addExpense);
router.get("/",authMiddleware,getUserWithExpenses);



export default router;