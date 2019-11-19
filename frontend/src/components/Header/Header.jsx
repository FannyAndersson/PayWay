import React, {useContext} from "react";
import { Row, Col, Button, Icon } from 'react-materialize';
import {UserContext} from '../../AuthUserContext';



const Header = () => {
    const {user} = useContext(UserContext);
    return (
        <React.Fragment>
            <Row>
                <Col node='header' l={3} offset='l4' className='header'>
                    <Button className={'toggle-sidemenu-btn ' + (user !== '' ? '' : 'hidden')}>
                        <Icon>
                            menu
                        </Icon>
                    </Button>
                    <p className="logo">PayWay</p>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Header;