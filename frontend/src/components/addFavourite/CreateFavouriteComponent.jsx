import React, { useContext } from 'react';
import { Row, Col, TextInput, Button } from 'react-materialize';
import { UserContext } from '../../AuthUserContext';
import UseAddFavourite from './UseCreateFavoriteHook';
import { Link} from 'react-router-dom';


const CreateFavouriteComponent = () => {

    const { user } = useContext(UserContext);

    const addFav = async () => {
         try {
        const input = {
            phone: inputs.phone
        }
        console.log(input)
        const response = await fetch('/api/createFavorite', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'aplication/json'
            }

        });
        const result ={user:await response.json(), status:response.status}
        if(result.status ===200){
            console.log(result, 'result');
        }
    }
    catch (error) {
        console.error('Error:', error)
    }
}
   
    const { inputs, handleInputChange, handleSubmit } = UseAddFavourite(addFav);

    return (
        <React.Fragment>
                <Row>
                    <Col node="form" onSubmit={handleSubmit} s={12} m={4} offset="m4">
                        <h1>Add your favourite</h1>

                        <TextInput 
                            className="form-control" 
                            type="text" 
                            label="Phone" 
                            name="phone" 
                            s={12} 
                            l={12}
                            onChange={handleInputChange} 
                            value={inputs.phone} 
                            required />
                        
                        <Button className="submit-btn w100">
                            Submit
                        </Button>
                    </Col>
                </Row>

        </React.Fragment>

    );
}

export default CreateFavouriteComponent;

