import React, { useContext } from "react";
import { Icon } from "react-materialize";
import { UserContext } from '../../AuthUserContext';

const LogoutBtn = () => {
    const { user, destroyAuthUser } = useContext(UserContext);
    const onLogout = async (e) => {
        destroyAuthUser();
        await fetch('/api/logout');
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
