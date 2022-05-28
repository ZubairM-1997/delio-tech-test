import  app from './server'
import sequelizeConnection  from './db'
import { appleShares, microsoftShares} from './fetchFunctions'
import StockInfo from './models/StockInfo';
import StockInfoInterface from "./interfaces/StockInfoInterface";
import { APIError, HttpStatusCode } from './error/Errors';

const PORT = 7000

sequelizeConnection.authenticate()
.then(() => console.log("Database connected..."))
.catch((error) => console.log(error))


app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}…`)

  try {
    const apple : StockInfoInterface = await appleShares();
    const microsoft : StockInfoInterface = await microsoftShares();

    const foundMicrosoft = await StockInfo.findOne({
      where: {
        name: 'MSFT'
    }})

    const foundApple = await StockInfo.findOne({
      where: {
        name: 'AAPL'
      }
    })
    if (!foundApple && !foundMicrosoft){
      const appleInstance = await StockInfo.create({
        name: 'AAPL',
        current_price: apple.c,
        change: apple.d,
        percent_change: apple.dp,
        high_price: apple.h,
        low_price: apple.l,
        open_price: apple.o,
        previous_close_price: apple.pc,
        createdAt: null,
        updatedAt: null
      })
  
      const microSoftInstance = await StockInfo.create({
        name: 'MSFT',
        current_price: microsoft.c,
        change: microsoft.d,
        percent_change: microsoft.dp,
        high_price: microsoft.h,
        low_price: microsoft.l,
        open_price: microsoft.o,
        previous_close_price: microsoft.pc,
        createdAt: null,
        updatedAt: null
      })
    } else {

      console.log("Data already exists")
    }


  } catch (error){
    console.log(error);
    throw new APIError('Internal Server Error', HttpStatusCode.INTERNAL_SERVER )
  }
})