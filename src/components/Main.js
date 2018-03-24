import React from 'react'
import { Register } from './Register'
import { Login } from './Login'
import { Switch, Route } from 'react-router'
import { Home } from './Home'

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Home/> : <Login handleLogin={this.props.handleLogin}/>
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}