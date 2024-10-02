import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import HomePage from './pages/HomePage'; // Adjust path according to your structure



class App extends Component{

  constructor(props){
    super(props);
    this.state = { apiResponse:"" };
  }

  callAPI(){
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  componentDidMount(){
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
      <HomePage />
      </div>
    );
  }

}

  /* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         
        </header>
        <p className='App-intro'>{this.state.apiResponse}</p> */



export default App;
