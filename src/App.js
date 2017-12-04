import React, { Component } from 'react';
import './App.css';
import Stockinfo from './components/Stockinfo';
import {loanQuoteForStock} from './api/iex';



class App extends Component {
  state = {
    symbol: 'A',
    quote: null,
    hasError: false
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.loadQuote()
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  //error catcher
  componentDidCatch() {
    console.log("i am here")
    this.setState({ hasError: true });
  }

  loadQuote() {
    loanQuoteForStock(this.state.symbol).then((quote) => {
        console.log(quote)
        // this.state.quote = ???
        this.setState({ quote: quote })
      })
      .catch((err) => {
        console.log(err);
        this.componentDidCatch();
      })
  }

  handleSymbolChange = (event) => {
    console.log(`handleSymbolChange with event: ${event}`);
    console.log(event.target);
    // const target = event.target;
    // const symbol = target.value;
    const symbol = event.target.value;
    this.setState({ symbol: symbol });
  }

  handleButtonClick = (event) => {
    console.log(event);
    this.loadQuote();
  }


  render() {
    console.log(`state is: ${this.state.symbol}`)

    if(this.state.hasError) {
      return (
        <h1>Sorry Something went wrong!!!</h1>
      );
    }

     return (

         // return this.props.children;
       <div className="App">
         <h1>Wolf of React</h1>


         <input
            value={ this.state.symbol }
            placeholder="Enter symbol"
            onChange={this.handleSymbolChange}
          />
          <button onClick = { this.handleButtonClick }>Get Quote</button>




           <Stockinfo{...this.state.quote}/>


       </div>
     );
   }
}

export default App;
