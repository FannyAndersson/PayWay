import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {UserContext} from './userContext';
import './css/style.css';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';

function App() {
	//use state to initiate navigate to main page after successful login
    const [toMainPage, setToMainPage] = useState(false);
    const [toLoginPage, setToLoginPage] = useState(false);
	const [user, setUser] = useState('');
	const checkLogin =async () => {
		const response = await fetch('/api/login');
		const result = {user: await response.json(), status: response.status};
		if (result.user) {
			setUser(result.user);
			setToMainPage(true); 
		}
		else {
			setToLoginPage(true); 
		}
	}
	if(!user) {
		checkLogin();
	}


	
  return (
	  <UserContext.Provider value={user}>
			<React.Fragment>
				<section className={'container-fluid'}>
				<Header />
				<Router>
				{toMainPage ? <Redirect to='/' /> : null}
				{toLoginPage ? <Redirect to='/login' /> : null}
					<Switch>
						<Route exact path="/">
						<MainPage />
						</Route>
						<Route exact path="/login">
							<LoginPage />
						</Route>
					</Switch>
				</Router>
				</section>
			</React.Fragment>
	  </UserContext.Provider>
	
	
  );
}

export default App;
