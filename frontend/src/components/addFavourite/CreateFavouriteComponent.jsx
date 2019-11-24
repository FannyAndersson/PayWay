import React, { useContext } from 'react';
import { Row, Col, TextInput, Button } from 'react-materialize';
import { UserContext } from '../../AuthUserContext';
import UseAddFavourite from './UseCreateFavoriteHook';
import {  Redirect } from 'react-router-dom';



const CreateFavouriteComponent = () => {

    const { user } = useContext(UserContext);

    const addFav = async () => {
         try {
        const input = {
            phone: inputs.phone
        }
        const response = await fetch('/api/createFavorite', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
    });
        const result ={user:await response.json(), status:response.status}
        if(result.status ===200){
            setFavoriteSuccessMsg(true);
            console.log(result, 'result');
        } else if(result.status === 505){
            setFavoriteAlreadyExistsMsg(true);
            console.log('exist')
        } else{
            if(result.status === 500){
                setUserDontExistMsg(true);
            }
        }
    }
    catch (error) {
        console.error('Error:', error)
    }
}

    const { inputs, handleInputChange, handleSubmit, favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg, favoriteSuccessMsg, setFavoriteSuccessMsg, userDontExistMsg, setUserDontExistMsg } = UseAddFavourite(addFav);

    return (
        <React.Fragment>
            {!user ? <Redirect to='/login' /> : null}
                <Row>
                    <Col node="form" onSubmit={handleSubmit} s={12} m={4} offset="m4">
                        <h1>Add your favourite</h1>

                        <TextInput
                            className="form-control"
                            className={ `validate${favoriteAlreadyExistsMsg ? 'invalid' : ''}`}
                            className={ `validate${favoriteSuccessMsg ? 'invalid' : ''}`}
                            className={ `validate${userDontExistMsg ? 'invalid' : ''}`}
                            type="text"
                            label="Phone"
                            name="phone"
                            s={12}
                            l={12}
                            onChange={handleInputChange}
                            value={inputs.phone}
                            required />

                             {favoriteSuccessMsg ? (
              <p style={{ color: 'green' }}>This user just been added to your favorite list</p>
            ) : (
              ''
            )}

                            {favoriteAlreadyExistsMsg ? (
              <p style={{ color: 'orange' }}>This user is already a favorite</p>
            ) : (
              ''
            )}
            {userDontExistMsg ? (
              <p style={{ color: 'red' }}>Theres is no such user with this phone number</p>
            ) : (
              ''
            )}

                        <Button className="submit-btn w100">
                            Submit
                        </Button>
                    </Col>
                </Row>

        </React.Fragment>

    );
}

export default CreateFavouriteComponent;

