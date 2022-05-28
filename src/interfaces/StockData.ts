interface StockData {
    id: number,
    name: string,
    current_price: string,
    change: string,
    percent_change: string,
    high_price: string,
    low_price: string,
    open_price: string,
    previous_close_price: string,
    createdAt: Date,
    updatedAt: Date
}

export default StockData