import React from 'react';
import Contact from '../Contact'
import { UserContext } from '../../userContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const Favourites = () => {

    return (
        <UserContext.Consumer>
            {
                user => (
                    <React.Fragment>
                        <Contact />
                        <ul>
                            <li>
                                Zenya 222
                            </li>
                            <li>
                                Alexandra 333
                            </li>
                        </ul>
                        <TextInput className="form-control" label="Email" email={true} s={12} l={12} required />
                        <TextInput className="form-control" label="Password" password={true} s={12} l={12} required /><Button className="login-btn" waves="light" style={{ width: '100%' }} type="button">
                            Add
                        </Button></React.Fragment>


                )
            }

        </UserContext.Consumer >

    );
}



export default Favourites;