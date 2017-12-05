import React, { Component } from 'react';
import './App.css';
import Stockinfo from './components/Stockinfo';
import PreviousState from './components/PreviousState';
import { loadQuoteForStock } from './api/iex';
import { loadLogoForStock } from './api/iex';
// import { loadPreviousSet } from './api/iex';





class App extends Component {
  state = {
    symbol: 'A',
    quote: null,
    logo: null,
    hasError: false,
    oldquote: null,
    oldlogo: null
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.loadQuote()
    this.loadLogo()
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  //error catcher
  componentDidCatch() {
    console.log("this component catches error")
    this.setState({ hasError: true });
  }


  loadQuote() {
    let currentStatus = this.state.quote
    this.setState({ oldquote: currentStatus })
    console.log(`this is the old quote variable :\n${JSON.stringify(currentStatus, null, 2)} `)
    loadQuoteForStock(this.state.symbol).then((quote) => {
        console.log(quote)
        // this.setState((prevState) => { oldquote: quote })
        // console.log('Previous state' + prevState)
        this.setState({ quote: quote })
      })
      .catch((err) => {
        console.log(err);
        this.componentDidCatch();
      })
  }

  loadLogo() {
    let currentLogo = this.state.logo
    this.setState({oldlogo: currentLogo})
    loadLogoForStock(this.state.symbol).then((logo) => {
        console.log(logo)
        this.setState({ logo: logo.url })
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
    this.loadLogo();
    
  }


  render() {
    console.log(`state is: ${this.state.symbol}`)

    if(this.state.hasError) {
      return (
        <div className="App">
          <h2>Sorry, wrong input :-( </h2>
          <p>Refresh the page and try again</p>
        </div>
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

        <div className='logo'>
          <img src={this.state.logo}/>
        </div>

        <Stockinfo{...this.state.quote}/>

        <div className='oldQuote'>
          <h2 className="previousQuote">Previous quote</h2>
          <img src={this.state.oldlogo}/>
          <PreviousState{...this.state.oldquote}/>
        </div>

      </div>
     );
   }
}

export default App;
