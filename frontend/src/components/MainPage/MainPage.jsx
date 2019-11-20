import React, {useContext} from "react";
import {UserContext} from '../../AuthUserContext';
import { Row, Col, TextInput, Button } from 'react-materialize';



const MainPage = () => {
    const {user} = useContext(UserContext);
    return (
        <React.Fragment>
            <Row>
                <Col l={3} offset='l4'>
                    <h1>Main Page</h1>
                    <p>Hello {user.name}</p>
                </Col>

            </Row>
        </React.Fragment>
    );
}

export default MainPage;