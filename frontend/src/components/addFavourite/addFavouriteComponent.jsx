import React, { useContext } from 'react';
import { Row, Col, TextInput, Button } from 'react';
import { UserContext } from '../../AuthUserContext';
import useAddFavourite from './useAddFavouriteHook';
import { Link} from 'react-router-dom';


const addFavFavouriteComponent = () => {
    const {user, getAuthUser} = useContext(UserContext);
    const addFav = () => {
         try {
        const input = {
            phone: inputs.phone
        }
        const response = await fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'aplication/json'
            }

        });
        const result ={user:await response.json(), status:response.status}
        if(result.status ===200){
            getAuthUser(result.user);
        }
    }
    catch (error) {
        console.error('Error:', error)
    }
}
   
    const { inputs, handleInputChange, handleSubmit } = useAddFavourite(addFav);

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <h1>Add your favourite</h1>

                        <TextInput className="form-control" type="text" lable="Phone" name="phone" onChange={handleInputChange} value={inputs.phone} phone={true} required />
                        <Button className= "submit-btn">
                            
                            <Link to="/favourites">Submit</Link>
                        </Button>

                    </Col>


                </Row>
            </form>

        </React.Fragment>

    );
}

export default addFavFavouriteComponent;

