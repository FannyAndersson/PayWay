import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {UserContext} from './userContext';
import './css/style.css';
import './css/style.css'
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Register from './components/Registration/Register';

function App() {
	const checkLogin = () => {
		return fetch('/api/login').then(res => {return res.json()});
	}
	const [user, setUser] = useState('');
	checkLogin().then(res => {if(res) {setUser(res)}});
	
  return (
	  <UserContext.Provider value={user}>
			<React.Fragment>
				<section className={'container-fluid'}>
				<Header />
				<Router>
					<Switch>
						<Route exact path="/">
						<MainPage />
						</Route>
						<Route exact path="/login">
							<LoginPage />
            </Route>
            <Route exact path="/register">
            <Register/>
            </Route>
					</Switch>
				</Router>
				</section>
			</React.Fragment>
	  </UserContext.Provider>
  
  )}
export default App;
