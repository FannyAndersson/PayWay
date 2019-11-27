import React, {useContext} from "react";
import SideMenu from '../SideMenu/SideMenu';
import {UserContext} from '../../AuthUserContext';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';




const Header = () => {
	const { user } = useContext(UserContext);

    return (
        <React.Fragment>
            <Row>
                <Col node='header' l={12} className='header' style={!user ? {justifyContent: "flex-end"} : null}>
                    {user ? <SideMenu user={user} /> : null}
                    <Link to="/" title="PayWay | Navigate to main-page" className="logo">PayWay</Link>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Header;