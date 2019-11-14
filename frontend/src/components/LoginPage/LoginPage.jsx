import React from "react";
import { Link} from 'react-router-dom';

import { Row, Col, TextInput, Button } from 'react-materialize';
import {UserContext} from '../../userContext';


const LoginPage = () => {
    return (
        <UserContext.Consumer>
            {user => (
                <React.Fragment>
                <Row>
                    <Col l={3} offset='l4' className='content'>
                        <h1>Login</h1>
                        <Col node="form" l={12} className="form">
                            <TextInput className="form-control" label="Email" email={true} s={12} l={12} required/>
                            <TextInput className="form-control" label="Password" password={true} s={12} l={12} required />
                            <Col node="p" s={12} l={12} className="forgot-your-pwd">Forgot your password?</Col>
                            <Button className="login-btn" waves="light" style={{width: '100%'}} type="button">
                                login
                            </Button>
                        </Col>
                        <Col s={12} l={12} style={{marginTop: '20px'}}>
                        <Button flat={true} className="register-link-btn raised-btn" style={{width: '100%'}} waves="light" >
                            <Link to="/register">Register account</Link>
                        </Button>
                        </Col>
                    </Col>
                </Row>
            </React.Fragment>
            )}
        </UserContext.Consumer>
        
    );
}

// LoginPage.contextType = UserContext;

export default LoginPage;