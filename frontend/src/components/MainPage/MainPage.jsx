import React, {useContext} from "react";
import { Link } from 'react-router-dom';

import {UserContext} from '../../AuthUserContext';
import { Row, Col } from 'react-materialize';



const MainPage = () => {
    const {user} = useContext(UserContext);
    return (
        <React.Fragment>
            <Row>
                <Col l={3} offset='l4'>
                    <h1>Main Page</h1>
                    <p>Hello {user.name}</p>
                    <Link to="/send-money">Send me all your money</Link>
                </Col>
            </Row>   
        </React.Fragment>
    );
}

export default MainPage;