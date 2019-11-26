import React, { useContext, useState } from 'react';
import { Row, Col, TextInput, Button } from 'react-materialize';
import { UserContext } from '../../AuthUserContext';
import UseAddFavourite from './UseCreateFavoriteHook';
import { Redirect } from 'react-router-dom';
import MessageComponent from '../Message/MessageComponent';




const CreateFavouriteComponent = () => {

    const { user } = useContext(UserContext);
    //showMessage state and handleMessageUnmount are added to show and dismiss message
    const [showMessage, setShowMessage] = useState(false);
    const handleMessageUnmount = () => {
        setShowMessage(false);
    }

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

            console.log(response, "res");
            const result = { response: await response.json(), status: response.status }
            if (result.status === 200) {
                setShowMessage(true);
            }
            if (result.status === 500) {
                if (result.response.errorCode === "noUser") {
                    setUserDontExistMsg(true);
                }
                if (result.response.errorCode === "selfFav") {
                    setselfFavouriteMsg(true);
                }
                if (result.response.errorCode === "alreadyFav") {
                    setFavoriteAlreadyExistsMsg(true);
                }
            }

        }
        catch (error) {
            console.error('Error:', error)
        }
    }

    const { inputs, handleInputChange, handleSubmit, favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg, favoriteSuccessMsg, userDontExistMsg, setUserDontExistMsg, selfFavouriteMsg, setselfFavouriteMsg } = UseAddFavourite(addFav);

    return (
        <React.Fragment>
            {!user ? <Redirect to='/login' /> : null}
            <Row>
                <Col node="form" onSubmit={handleSubmit} s={12} m={4} offset="m4">
                    <h1>Add your favourite</h1>

                    <TextInput
                        className={`validate ${favoriteAlreadyExistsMsg || favoriteSuccessMsg || userDontExistMsg || selfFavouriteMsg ? 'invalid' : ' form-control'}`}
                        type="text"
                        label="Phone"
                        name="phone"
                        s={12}
                        l={12}
                        onChange={handleInputChange}
                        value={inputs.phone || ''}
                        required />


                    {favoriteAlreadyExistsMsg ? (
                        <p style={{ color: 'orange' }}>This user is already a favorite</p>
                    ) : (
                            ''
                        )}
                    {userDontExistMsg ? (
                        <p style={{ color: 'red' }}>There is no such user with this phone number</p>
                    ) : (
                            ''
                        )}
                    {selfFavouriteMsg ? (
                        <p style={{ color: 'red' }}>You can not be a favourite to yourself!</p>
                    ) : (
                            ''
                        )}

                    <Button className="submit-btn w100">
                        Submit
                        </Button>
                </Col>
            </Row>
            {showMessage ? <MessageComponent
                success
                redirectTo="/profile/favorites/"
                text={[`User with number ${inputs.phone} has been added to your favorites!`]}
                unmountMe={handleMessageUnmount}
            />
                : null}
        </React.Fragment>

    );
}

export default CreateFavouriteComponent;

