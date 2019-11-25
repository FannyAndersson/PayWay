import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserContextProvider from './AuthUserContext';
import ContextKeeper from './components/ContextKeeper';
import './css/style.css';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Register from './components/Registration/Register';
import SendMoney from './components/SendMoney';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from "./components/UserProfile/UserProfile";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import Children from "./components/Children/Children";
import ChildrenTransactions from "./components/Children/ChildrenTransaction";
import CreateFavouriteComponent from './components/addFavourite/CreateFavouriteComponent';
import FavouritesList from './components/FavouritesList/FavouritesList';
import AddChild from './components/AddChildToParent/AddChildForm';

function App() {
	return (
		<UserContextProvider>
			<Router>
				<ContextKeeper>
					<React.Fragment>
						<section className={"container-fluid"}>
							<Header />
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
								<Route exact path="/profile/favorites/add-favorite">
									<CreateFavouriteComponent />
								</Route>
								<Route exact path="/profile/favorites">
									<FavouritesList />
								</Route>
								<Route exact path="/register">
									<Register />
								</Route>
								<PrivateRoute exact path="/send-money" component={ SendMoney } />
								<Route exact path="/profile/settings">
									<UserProfile/>
								</Route>
								<Route exact path="/profile/transactions">
									<TransactionPage />
								</Route>
								<Route exact path="/profile/children">
									<Children />
								</Route>
								<Route
									exact path="/profile/children/transactions/:_id"
									render={props => (
										<ChildrenTransactions
											{...props}

										/>
									)}
								/>
								<Route exact path="/profile/children/add-child">
									<AddChild />
								</Route>
								<Route exact path="/profile/favorites/add-favorite">
									<CreateFavouriteComponent />
								</Route>
								<Route exact path="/profile/favorites">
									<FavouritesList />
								</Route>
								<PrivateRoute exact path="/send-money" component={SendMoney} />
							</Switch>
						</section>
					</React.Fragment>
				</ContextKeeper>
			</Router>
		</UserContextProvider>
	);
}

export default App;
