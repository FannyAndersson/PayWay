import React, {useContext, useState} from "react";
import {UserContext} from '../../AuthUserContext';
import { Row, Col, Button } from 'react-materialize';
import MessageComponent from '../Message/MessageComponent';



const MainPage = () => {
    const {user} = useContext(UserContext);
    const [showMMessage, setShowMessage] = useState(false);
    const onMessage = () => {
        setShowMessage(true);
    }
    const handleMessageUnmount = () => {
        setShowMessage(false);
    }
    return (
        <React.Fragment>
            <Row>
                <Col l={3} offset='l4'>
                    <h1>Main Page</h1>
                    <p>Hello {user.name}</p>
                    <Button type="button" onClick={onMessage}>Bad Message</Button>
                </Col>
            </Row>
            {showMMessage ? <MessageComponent 
                                success={false}
                                redirectTo="/profile/transactions" 
                                text={[`Hello ${user.name}! I have bad news for you!`,`Sprint review is about 2 days!`, `Redirect to your transactions!`]} 
                                unmountMe={handleMessageUnmount} 
                            />
                            : null}   
        </React.Fragment>
    );
}

export default MainPage;