import React from "react";
import Favourites from '../favouritesComponent/Favourites';

const MainPage = () => {
    return (
        <React.Fragment>
            <h1>Main Page</h1>
            <p>Here should be content Start-page-loggedIn if user logged in successfully.</p>
            <Favourites />
        </React.Fragment>

    );
}

export default MainPage;