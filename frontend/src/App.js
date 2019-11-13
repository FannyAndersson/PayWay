import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (

	<Router>
		<Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
	</Router>
  );
}

export default App;
