
import React, {useContext} from "react";

import { Redirect, Link} from "react-router-dom";

import {UserContext} from '../../AuthUserContext';
import { Row, Col, Button } from 'react-materialize';



const MainPage = () => {

    const {user} = useContext(UserContext);

    return <React.Fragment>
        {!user ? <Redirect to="/login" /> : null}
        <Col style={{width: '100%', marginTop: '42%'}}>
          <Row>
            <Button type="button" style={{ width: '100%', marginBottom: '50%' }}>
              <Link to="/send-money">SEND MONEY</Link>
            </Button>
          </Row>
          <Row>
            <Button type="button" style={{ width: '100%', backgroundColor: '#03DAC6' }}>
              <Link to="/profile/transactions">TRANSACTIONS</Link>
            </Button>
          </Row>
        </Col>
      </React.Fragment>;
}

export default MainPage;