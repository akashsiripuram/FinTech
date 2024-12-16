import express from 'express';
import {verifyToken} from './verifyToken.route.js';
import { createExpense,getUserExpenses } from '../controller/expenses.controller.js';

const router = express.Router();

router.get('/', verifyToken, getUserExpenses);
router.post('/add', verifyToken, createExpense); // Protect the route with verifyToken

export default router;
