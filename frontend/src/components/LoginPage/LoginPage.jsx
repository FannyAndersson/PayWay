import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, TextInput, Button } from 'react-materialize';
import useLoginForm from "./UseLoginFormHook";
import { UserContext } from '../../AuthUserContext';

import MessageComponent from '../Message/MessageComponent';


const LoginPage = () => {
    //use user from UserContext
    // if user exists in context, app navigates to mainPage
    const { user, keepAuthUser } = useContext(UserContext);
    const [showMMessage, setShowMessage] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handleMessageUnmount = () => {
        setShowMessage(false);
    }

    const showErrorMessage = (text) => {
        setShowMessage(true);
        setErrorText(text);
    }

    const onLogin = async () => {
        try {
            const login = {
                email: inputs.email,
                password: inputs.password
            }
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(login),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = { response: await response.json(), status: response.status };
            if (result.status === 200) {
                keepAuthUser(result.response);
            }
            else {
                if(result.response.errorCode === "wrongPwd") {
                    showErrorMessage(result.response.error);
                }
                if(result.response.errorCode === "inactivated") {
                    showErrorMessage(result.response.error);
                }
                if(result.response.errorCode === "notFound") {
                    showErrorMessage(result.response.error);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const { inputs, handleInputChange, handleSubmit } = useLoginForm(onLogin);
    return (

        <React.Fragment>
            {user ? <Redirect to='/' /> : null}
            <Row>
                <Col className='content'>
                    <h1>Login</h1>
                    <Col node="form" onSubmit={handleSubmit} l={12} className="form">
                        <TextInput className="form-control" name="email" onChange={handleInputChange} value={inputs.email} label="Email" email={true} s={12} l={12} required />
                        <TextInput className="form-control" name="password" onChange={handleInputChange} value={inputs.password} label="Password" password={true} s={12} l={12} required />
                        {/* <Col node="p" s={12} l={12} className="forgot-your-pwd">Forgot your password?</Col> */}
                        <Button className="login-btn" waves="light" style={{ width: '100%' }} >
                            login
                        </Button>
                    </Col>
                    <Col s={12} l={12} style={{ marginTop: '20px' }}>
                        <Button flat={true} className="register-link-btn raised-btn" style={{ width: '100%' }} waves="light" >
                            <Link to="/register">Register account</Link>
                        </Button>
                    </Col>
                </Col>
            </Row>
            {showMMessage ? <MessageComponent 
                                success={false}
                                text={[errorText]} 
                                unmountMe={handleMessageUnmount} 
                            />
                            : null}
        </React.Fragment>
    );
}

export default LoginPage;