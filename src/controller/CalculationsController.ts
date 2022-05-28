import StockInfo from "../models/StockInfo"
import StockData from "../interfaces/StockData"
import { DBError } from '../error/Errors';

export const calculateProfitOrLoss = async (req, res) => {
    const { ticker } = req.params

    try{
        const foundStock = await StockInfo.findOne({
            where: {
                name: ticker.toUpperCase()
            }
        })
    
        if (foundStock){
            const stock : StockData = await foundStock.toJSON()
            const tenMultiplierStockPrice = parseFloat(stock.current_price) * 10;
            const tenMultiplierPrevousClosePrice = parseFloat(stock.previous_close_price) * 10
    
            const currentPricePreviousClosePriceDifference = tenMultiplierStockPrice - tenMultiplierPrevousClosePrice
            let result;
    
            if (currentPricePreviousClosePriceDifference > 0){
                result = 'In Profit'
            } else {
                result = 'In Loss'
            }
    
    
            const response = {
                profitOrLoss_currentPrice_prevClosePrice: `$${currentPricePreviousClosePriceDifference}`,
                result
            }
    
            return res.json(response)
            
        } else {
            console.log('Stock not found')
            return res.status(404).json({
                errorMessage: 'Stock not found in database'
            })
        }    

    } catch (error){
        console.log(error)
        throw new DBError('DB Query Failed', 'FindOne Query failed')
    }
    
}

export const checkCheapestStock = async (req, res) => {
    try {
        const allStocks = await StockInfo.findAll({});
        const stocks : StockData[] =  allStocks.map((stock) => stock.toJSON())
        console.log(stocks)
        
        const cheapestStock : StockData = stocks.reduce((prev : any, curr: any) => {
            return parseFloat(prev.current_price) < parseFloat(curr.current_price) ? prev : curr
        })
    
        return res.json({
            cheapest: `${cheapestStock.name} is currently the cheapest at the moment` 
        })

    } catch(error){
        console.log(error)
        throw new DBError('DB Query Failed', 'FindAll Query failed')
    }
}

export const checkMostFluctuating = async (req,  res) => {
    try {
        const allStocks = await StockInfo.findAll({});
        const stocks : StockData[] = await allStocks.map((stock) => stock.toJSON())
        
        const mostFluctuating : StockData = stocks.reduce((prev : any , curr: any) => {
            return parseFloat(prev.percent_change) > parseFloat(curr.percent_change) ? prev : curr
        })
    
        return res.json({
            mostFluctuatingStock: `${mostFluctuating.name} is the most volatile stock at the moment` 
        })
    } catch(error){
        console.log(error)
        throw new DBError('DB Query Failed', 'FindAll Query failed')
    }
}

export const checkHighestOpenPrice = async (req, res) => {
    try {
        const allStocks = await StockInfo.findAll({});
        const stocks : StockData[] = await allStocks.map((stock) => stock.toJSON())
        
        const highestOpenPrice : StockData = stocks.reduce((prev : any , curr: any) => {
            return parseFloat(prev.open_price) > parseFloat(curr.open_price) ? prev : curr
        })
    
        return res.json({
            highestOpenPrice: `${highestOpenPrice.name} opened with the highest price` 
        })

    } catch (error){
        console.log(error)
        throw new DBError('DB Query Failed', 'FindAll Query failed')
    }
}