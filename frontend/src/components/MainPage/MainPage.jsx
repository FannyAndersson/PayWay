
import React, {useContext, useState} from "react";

import { Redirect} from "react-router-dom";

import {UserContext} from '../../AuthUserContext';
import { Row, Col, Button } from 'react-materialize';
import MessageComponent from '../Message/MessageComponent';



const MainPage = () => {
    const {user} = useContext(UserContext);
    const [showMessage, setShowMessage] = useState(false);
    const onMessage = () => {
        setShowMessage(true);
    }
    const handleMessageUnmount = () => {
        setShowMessage(false);
    }
    return (
        <React.Fragment>
            {!user ? <Redirect to='/login' /> : null}
            <Row>
                <Col>
                    <h1>Main Page</h1>
                    <p>Hello {user.name}</p>
                    <Button type="button" onClick={onMessage}>Bad Message</Button>
                </Col>
            </Row>
            {showMessage ? <MessageComponent 
                                success={false}
                                redirectTo="/profile/transactions" 
                                text={[`Hello ${user.name}! I have bad news for you!`,`Sprint review is about 2 days!`, `Redirect to your transactions!`]} 
                                unmountMe={handleMessageUnmount} 
                            />
                            : null}   
            </Row>

        </React.Fragment>
    );
}

export default MainPage;