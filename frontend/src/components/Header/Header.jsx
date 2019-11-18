import React from "react";
import { Row, Col, Button, Icon } from 'react-materialize';
import {UserContext} from '../../userContext';


const Header = () => {
    return (
        <UserContext.Consumer>
            {user => (
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
            )}
        </UserContext.Consumer>
        
    );
}


export default Header;