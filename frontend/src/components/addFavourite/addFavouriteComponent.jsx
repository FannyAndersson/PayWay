import React, {useContext} from 'react';
import {Row, Column, TextInput, Button} from 'react';
import { UserContext } from '../../AuthUserContext';
import useAddFavourites from './useAddFavouriteHook';


const addFavFavouriteComponent= () => {




const {inputs, handleInputChange, handleSubmit} = useAddFavourites();

    return (
            <React.Fragment>

            <Row>
                <Col>
                <h1>Add your favourite</h1>
                <TextInput/>
                
                
                </Col>


            </Row>


            </React.Fragment>




    );
}

export default addFavFavouriteComponent;

