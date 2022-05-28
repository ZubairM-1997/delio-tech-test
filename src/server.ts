import express from "express";
import { calculateProfitOrLoss, checkCheapestStock, checkHighestOpenPrice, checkMostFluctuating } from './controller/CalculationsController';
const app = express()

app.get('/profitOrLoss/:ticker', calculateProfitOrLoss)
app.get('/currentCheapestStock', checkCheapestStock)
app.get('/mostFluctuating', checkMostFluctuating)
app.get('/highestOpenPrice', checkHighestOpenPrice)

export default app;