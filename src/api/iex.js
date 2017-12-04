import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
});

export function loanQuoteForStock(symbol) {
  return api.get(`/stock/${symbol}/quote`)
            .then((res) => {
              return res.data
            });

}
