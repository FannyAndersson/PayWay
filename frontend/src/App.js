import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./AuthUserContext";
import ContextKeeper from "./components/ContextKeeper";
import "./css/style.css";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import Register from './components/Registration/Register';
import SendMoney from './components/SendMoney';
import PrivateRoute from './components/PrivateRoute';
import TransactionPage from "./components/TransactionPage/TransactionPage";
import Children from "./components/Children/Children";

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
								<Route exact path="/register">
									<Register />
								</Route>
								<Route exact path="/profile/transactions">
									<TransactionPage />
								</Route>
								<Route exact path="/profile/transactions">
									<TransactionPage />
								</Route>
								<Route exact path="/profile/children">
									<Children />
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
