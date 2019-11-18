import React from "react";
import {UserContext} from '../../userContext';
import { Row, Col } from 'react-materialize';



const MainPage = () => {
    return (
        <UserContext.Consumer>
            {user => (
                <React.Fragment>
                    <Row>
                        <Col l={3} offset='l4'>
                            <h1>Main Page</h1>
                            <p>Hello {user.name}</p>
                        </Col>
                    </Row>
                        
                </React.Fragment>

            )}
            </UserContext.Consumer>
        
    );
}

export default MainPage;