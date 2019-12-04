import React, { useContext } from "react";
import { Icon } from "react-materialize";
import {UserContext} from '../../AuthUserContext';

const LogoutBtn = () => {
    const {user, destroyAuthUser} = useContext(UserContext);
	const onLogout = async (e) => {
        let listItems = e.target.closest('li').parentNode.getElementsByClassName('active');
        if(listItems.length) {
            listItems[0].classList.remove('active');
        }
        const response = await fetch('/api/logout');    
        if(response.status === 200) {
            destroyAuthUser();
        }
	}

    return (
        <React.Fragment>
            <li>
                <span onClick={onLogout} className="logout-btn waves-effect sidenav-close" title={user.name + ' | Log out'}>
                    <Icon>exit_to_app</Icon>
                    Log out
                </span>
            </li>
        </React.Fragment>
    );
}

export default LogoutBtn;
