import React, {useContext} from 'react';
import {Row, Column, TextInput, Button} from 'react';
import { UserContext } from '../../AuthUserContext';
import useAddFavourites from './useAddFavouriteHook';


const addFavFavouriteComponent= () => {




const {inputs, handleInputChange, handleSubmit} = useAddFavourites();

    return (
            <React.Fragment>
                <form onSubmit={handleSubmit}>
            <Row>
                <Col>
                <h1>Add your favourite</h1>
                
                <TextInput type='text' lable ='Phone' name='phone' onChange={handleInputChange} value={inputs.phone} phone={true} required/>     
                <Button >
                    Send
                    </Button>         
                
                </Col>


            </Row>
                </form>

            </React.Fragment>




    );
}

export default addFavFavouriteComponent;

