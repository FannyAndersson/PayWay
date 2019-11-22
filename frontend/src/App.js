import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContextProvider from './AuthUserContext';
import ContextKeeper from './components/ContextKeeper';
import './css/style.css';
import './css/style.css'
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Register from './components/Registration/Register';
import CreateFavouriteComponent from './components/addFavourite/CreateFavouriteComponent';

function App() {

	return (
		<UserContextProvider>
			<ContextKeeper>
				<React.Fragment>
					<section className={'container-fluid'}>
						<Router>
							<Header />
							<Switch>
								<Route exact path="/">
									<MainPage />
								</Route>
								<Route exact path="/login">
									<LoginPage />
								</Route>
								<Route exact path="/profile/favorites/add-favorite">
									<CreateFavouriteComponent />
								</Route>
								<Route exact path="/register">
									<Register />
								</Route>
							</Switch>
						</Router>
					</section>
				</React.Fragment>

			</ContextKeeper>
		</UserContextProvider>
	);
}



export default App;
