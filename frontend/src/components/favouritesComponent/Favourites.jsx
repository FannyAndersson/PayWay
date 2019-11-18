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
                        
                        <TextInput className="form-control" label="Phone" phone={true} required />
                        <Button type ="submit" waves ='light'>
                            Subbmit
                            <Icon right>
                                send
                                </Icon>
                        </Button>
                        </React.Fragment>


                )
            }

        </UserContext.Consumer >

    );
}



export default Favourites;