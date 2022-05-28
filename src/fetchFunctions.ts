import fetch from 'node-fetch'

const fetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  }


export const microsoftShares =  () => fetch(`https://finnhub.io/api/v1/quote?symbol=MSFT&token=${process.env.API_TOKEN}`, fetchOptions).then((res) => res.json())

export const appleShares = () => fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.API_TOKEN}`, fetchOptions).then((res) => res.json())