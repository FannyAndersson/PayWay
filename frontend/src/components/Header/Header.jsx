import React, {useContext} from "react";
import { Row, Col } from 'react-materialize';
import SideMenu from '../SideMenu/SideMenu';
import {UserContext} from '../../UserContext';



const Header = () => {
	const { user } = useContext(UserContext);

    return (
        <React.Fragment>
            <Row>
                <Col node='header' l={3} offset='l4' className='header'>
                    <SideMenu user={user} />
                    <p className="logo">PayWay</p>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Header;