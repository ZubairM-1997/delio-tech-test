import  app from './server'
import sequelizeConnection  from './db'
import { fetchShares } from './fetchFunctions';
import StockInfo from './models/StockInfo';
import StockInfoInterface from "./interfaces/StockInfoInterface";
import { APIError, HttpStatusCode } from './error/Errors';
import { tickerSymbols } from './tickerSymbols';

const PORT = 7000

sequelizeConnection.authenticate()
.then(() => console.log("Database connected..."))
.catch((error) => console.log(error))


app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}…`)

  tickerSymbols.forEach( async (ticker: string ) => {
    try {
      const fetchedStock : StockInfoInterface = await fetchShares(ticker)
      const foundStock = await StockInfo.findOne({
        where: {
          name: ticker
        }
      })
  
      if (!foundStock){
        await StockInfo.create({
          name: ticker,
          current_price: fetchedStock.c,
          change: fetchedStock.d,
          percent_change: fetchedStock.dp,
          high_price: fetchedStock.h,
          low_price: fetchedStock.l,
          open_price: fetchedStock.o,
          previous_close_price: fetchedStock.pc
        })
  
      } else {
        console.log('Data already exists in database')
      }
    } catch(error){
      console.log(error);
      throw new APIError('Internal Server Error', HttpStatusCode.INTERNAL_SERVER )
    }
  })

  
})