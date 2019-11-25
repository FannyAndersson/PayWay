import React, {useContext} from "react";
import SideMenu from '../SideMenu/SideMenu';
import {UserContext} from '../../AuthUserContext';
import { Link } from 'react-router-dom';




const Header = () => {
	const { user } = useContext(UserContext);

    return (
        <React.Fragment>
            <Row>
                <Col node='header' l={3} offset='l4' className='header'>
                    <SideMenu user={user} />
                    <Link to="/" title="PayWay | Navigate to main-page" className="logo">PayWay</Link>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Header;