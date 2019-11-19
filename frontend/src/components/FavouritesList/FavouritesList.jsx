import React from 'react';
import { UserContext } from '../../UserContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const FavouritesList = () => {

    const { user } = useContext(UserContext);
    
    return (
        
        <React.Fragment>

            <Row>
                <Col className='fav-list'>
                    <p className='fav-desc'>List of your favourites</p>
                    <ul className= 'fav-ul'>
                        {user.favourites.map(fav => {
                            return (<li className= 'fav-l-item' key={fav._id}>{fav.phone}</li>)
                        })}
                    </ul>
                                        
                </Col>
            </Row>
        
        </React.Fragment>
    );
}

export default FavouritesList;

// const addFav = () => {
    //    setUser([...favourites, user._id]);
    // }