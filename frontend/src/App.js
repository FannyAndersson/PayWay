import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import Register from './components/Register';

function App() {
  return (
	<Router>
		<Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
        <Route path="/register" component={Register}/>
	</Router>
  );
}

export default App;
