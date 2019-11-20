import React, {useContext} from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";
import {UserContext} from '../../AuthUserContext';

const SideMenuItem = (props) => {
    const {user} = useContext(UserContext);
    const onClickItem = (e) => {
        let listItems = e.target.closest('li').parentNode.getElementsByClassName('active');
        if(listItems.length) {
            listItems[0].classList.remove('active');
        }
        e.target.closest('li').classList.add('active');
    }
    return (
        <React.Fragment>
            <li className={window.location.pathname === props.to ? 'active' : ''}>
                <Link onClick={onClickItem} className="waves-effect sidenav-close" to={props.to} title={user.name + ' | ' + props.text}>
                    <Icon>{props.icon}</Icon>
                    {props.text}
                </Link>
            </li>
        </React.Fragment>
    );
}

export default SideMenuItem;