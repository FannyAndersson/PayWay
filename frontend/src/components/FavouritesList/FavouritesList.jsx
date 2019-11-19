import React from 'react';
import { UserContext } from '../../UserContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const FavouritesList = () => {

    const { user } = useContext(UserContext);
    
    return (
        
        <React.Fragment>

            <Row>
                <Col className='fav-list'>

                    <ul>
                        {user.favourites.map(fav => {
                            return (<li key={fav._id}>{fav.phone}</li>)
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

// const addFav = () => {
    //    setUser([...favourites, user._id]);
    // }