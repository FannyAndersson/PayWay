import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './css/style.css'
import MainPage from './components/MainPage/MainPage';
import Register from './components/Registration/Register';

function App() {
  return (
	<Router>
		<Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/register">
          <Register/>
          </Route>
        </Switch>
	</Router>
  );
}

export default App;
