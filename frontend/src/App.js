import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import TransactionPage from "./components/TransactionPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/transaction">
          <TransactionPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
