import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
});



export function loadQuoteForStock(symbol) {
  return api.get(`/stock/${symbol}/quote`)
            .then((res) => {
              return res.data
            });

}

export function loadLogoForStock(symbol) {
  return api.get(`/stock/${symbol}/logo`)
            .then((res) => {
              return res.data
            });

}

// export function loadPreviousSet(prevState) {
//   console.log(prevState)
// }
