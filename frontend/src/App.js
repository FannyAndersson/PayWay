import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserContextProvider from './UserContext';
import ContextKeeper from './components/ContextKeeper';
import './css/style.css';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import FavouritesList from './components/FavouritesList/FavouritesList';

function App() {

  return (
	<UserContextProvider>
		<ContextKeeper>
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
						<Route exact path="/favourites">
							<FavouritesList />
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
