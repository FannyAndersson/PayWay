import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <h2>Payway</h2>

            <Route path="/hej">
                Hej!
            </Route>
        </div>
    );
}

export default App;
