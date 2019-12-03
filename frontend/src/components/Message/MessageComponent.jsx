import React from "react";
import { Col, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

//import MessageComponent to another component where message about success or fail must be shown
//to parent Component add state showMessage as well as method handleMessageUnmount to dismiss Message

const MessageComponent = (props) => {
    const onClickMessage = () => {
        props.unmountMe();
    }
    return (
        <div className="message-wrap">
            <Col className="message-body">
                {props.text.map(line => {
                    return <p key={line}>{line}</p>
                })}
            <div style={{marginTop: "10px"}}>
            <Button
                floating
                large
                className={"message-btn " + (props.success ? 'green' : 'red')}
                waves="light"
                onClick={onClickMessage}
                >
                    <Icon>{props.success ? 'check' : 'close'}</Icon>
                    {props.redirectTo ? <Link to={props.redirectTo} /> : null}
                </Button>
            </div>
            </Col>
        </div>
    );
}

export default MessageComponent;
