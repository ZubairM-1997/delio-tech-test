import { DECIMAL, Model, STRING} from 'sequelize'
import sequelize from '../db';

class StockInfo extends Model {}

StockInfo.init(
{
    name: STRING,
    current_price: {
    type: DECIMAL
    },
    change: {
        type: DECIMAL
    },
    percent_change: {
        type: DECIMAL
    },
    high_price: {
        type: DECIMAL
    },
    low_price: {
        type: DECIMAL
    },
    open_price: {
        type: DECIMAL
    },
    previous_close_price: {
        type: DECIMAL
    }
}, {sequelize, modelName: 'StockInfo', tableName: 'StockInfo'}
)



export default StockInfo;