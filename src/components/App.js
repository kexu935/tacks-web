import React, { Component } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';
import '../styles/App.css';

class App extends Component {
  state ={
      isLoggedIn : Boolean(localStorage.getItem(TOKEN_KEY)),
  }

  componentDidMount() {
      document.title = "Tacks";
  }

  handleLogin = (token) => {
      localStorage.setItem(TOKEN_KEY, token);
      this.setState({isLoggedIn:true});
  }

  handleLogout = () => {
      this.setState({isLoggedIn:false});
      localStorage.removeItem(TOKEN_KEY);
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
