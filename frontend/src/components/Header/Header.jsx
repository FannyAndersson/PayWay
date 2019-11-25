import React, {useContext} from "react";
import SideMenu from '../SideMenu/SideMenu';
import {UserContext} from '../../AuthUserContext';



const Header = () => {
	const { user } = useContext(UserContext);

    return (
        <React.Fragment>
           <header className="header">
           <SideMenu user={user} />
                    <p className="logo">PayWay</p>
           </header>
        </React.Fragment>
    );
}

export default Header;