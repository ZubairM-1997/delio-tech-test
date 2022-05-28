import fetch from 'node-fetch'

const fetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  }




export const fetchShares = (ticker: string) => fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.API_TOKEN}`, fetchOptions).then((res) => res.json())