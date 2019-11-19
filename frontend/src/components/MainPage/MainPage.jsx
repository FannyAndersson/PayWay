import React, {useContext} from "react";
import {  Redirect, Link } from 'react-router-dom';
import {UserContext} from '../../AuthUserContext';
import { Row, Col, TextInput, Button } from 'react-materialize';



const MainPage = () => {
    const {user} = useContext(UserContext);
    return <React.Fragment>
        {!user ? <Redirect to="/login" /> : null};
        <Row>
          <Col l={3} offset="l4">
            <h1>Main Page</h1>
            <p>Hello {user.name}</p>
          </Col>
          <Button flat={true} className="register-link-btn raised-btn" style={{ width: '100%' }} waves="light">
            <Link to="/createchild">Create child</Link>
          </Button>
        </Row>
      </React.Fragment>;
}

export default MainPage;