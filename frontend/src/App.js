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
import ResetPasswordComponent from './components/ResetPassword/ResetPasswordComponent';
import ActivatedUser from './components/ActivatedUser/ActivatedUser';
import ChangePasswordComponent from './components/ResetPassword/ChangePasswordComponent';

function App() {
	return (
		<UserContextProvider>
			<Router>
				<ContextKeeper>
					<React.Fragment>
						<section className={"container-fluid"}>
							<Header />
							<Switch>
								<Route exact path="/login" component={LoginPage} />
								<PrivateRoute exact path="/" component={MainPage} />
								<PrivateRoute exact path="/favourites" component={FavouritesList} />
								<PrivateRoute exact path="/profile/favorites/add-favorite" component={CreateFavouriteComponent} />
								<PrivateRoute exact path="/profile/favorites" component={FavouritesList} />
								<Route exact path="/register" component={Register} />
								<PrivateRoute exact path="/send-money" component={ SendMoney } />
								<PrivateRoute exact path="/profile/settings" component={ UserProfile } />
								<PrivateRoute exact path="/profile/transactions" component={ TransactionPage } />
								<PrivateRoute exact path="/profile/children" component={ Children } />
								<PrivateRoute exact path="/profile/children/transactions/:_id" component={ ChildrenTransactions } />
								<PrivateRoute exact path="/profile/children/add-child" component={ AddChild } />
								<PrivateRoute exact path="/profile/favorites/add-favorite" component={ CreateFavouriteComponent } />
								<PrivateRoute exact path="/profile/change-password" component={ChangePasswordComponent} />
								<PrivateRoute exact path="/profile/favorites" component={ FavouritesList } />

								<Route exact path="/activate-account/:id" component={ActivatedUser} />
								<Route exact path="/reset-password/:id" component={ ResetPasswordComponent } />
								
								
							
							</Switch>
						</section>
					</React.Fragment>
				</ContextKeeper>
			</Router>
		</UserContextProvider>
	);
}

export default App;
