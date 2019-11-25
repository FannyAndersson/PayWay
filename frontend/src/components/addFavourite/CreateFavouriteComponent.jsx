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
<<<<<<< HEAD
        const result ={response:await response.json(), status:response.status}
        if(result.status === 200){
            setFavoriteSuccessMsg(true);
=======
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
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4
        }
        if(result.status === 500) {
            if (result.response.errorCode === "noUser") {
                setUserDontExistMsg(true);
            }
            if (result.response.errorCode === "selfFav") {
                setselfFavouriteMsg(true);
            }
            if(result.response.errorCode === "alreadyFav") {
                setFavoriteAlreadyExistsMsg(true);
            }
        }
        
    }
    catch (error) {
        console.error('Error:', error)
    }
}

<<<<<<< HEAD
    const { inputs, handleInputChange, handleSubmit, favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg, favoriteSuccessMsg, setFavoriteSuccessMsg, userDontExistMsg, setUserDontExistMsg, selfFavouriteMsg, setselfFavouriteMsg } = UseAddFavourite(addFav);
=======
    const { inputs, handleInputChange, handleSubmit, favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg, favoriteSuccessMsg, setFavoriteSuccessMsg, userDontExistMsg, setUserDontExistMsg } = UseAddFavourite(addFav);
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4

    return (
        <React.Fragment>
            {!user ? <Redirect to='/login' /> : null}
                <Row>
                    <Col node="form" onSubmit={handleSubmit} s={12} m={4} offset="m4">
                        <h1>Add your favourite</h1>

                        <TextInput
<<<<<<< HEAD
                            className={ `validate ${favoriteAlreadyExistsMsg || favoriteSuccessMsg || userDontExistMsg || selfFavouriteMsg ? 'invalid' : ' form-control'}`}
=======
                            className="form-control"
                            className={ `validate${favoriteAlreadyExistsMsg ? 'invalid' : ''}`}
                            className={ `validate${favoriteSuccessMsg ? 'invalid' : ''}`}
                            className={ `validate${userDontExistMsg ? 'invalid' : ''}`}
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4
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
<<<<<<< HEAD
              <p style={{ color: 'red' }}>There is no such user with this phone number</p>
            ) : (
              ''
            )}
            {selfFavouriteMsg ? (
            <p style={{ color: 'red' }}>You can not be a favourite to yourself!</p>
                        ) : (
                        ''
                        )}
=======
              <p style={{ color: 'red' }}>Theres is no such user with this phone number</p>
            ) : (
              ''
            )}
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4

                        <Button className="submit-btn w100">
                            Submit
                        </Button>
                    </Col>
                </Row>

        </React.Fragment>

    );
}

export default CreateFavouriteComponent;

