import React from 'react';
import { UserContext } from '../../userContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const FavouritesList = () => {

    const { user } = UserContext(UserContext);
    // const addFav = () => {
    //    setUser([...favourites, user._id]);
    // }

    return (


        <React.Fragment>

            <Row>
                <Col className='fav-list'>

                    <ul>
                        {favourites.map(user_id => {
                            return (<li key={user_id}>{Favourites[req.body.phone]}</li>)
                        })}
                    </ul>
                    
                    <TextInput className="form-control" label="Phone" phone={true} required />
                    <Button type="submit" onclick={addFav} waves='light'>
                        Subbmit
                    <Icon right>
                            send
                    </Icon>
                    </Button>
                </Col>
            </Row>



        </React.Fragment>
    );
}

export default FavouritesList;