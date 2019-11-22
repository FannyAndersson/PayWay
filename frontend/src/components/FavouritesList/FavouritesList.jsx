import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const FavouritesList = () => {

    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    console.log(user._id);


    useEffect(() => {
        let mounted = true;

        const getFavorites = async () => {
            try {
                const userID = user._id;
                let key = '/api/users/';
                let url = key + userID + '/favorites';
                const data = await fetch(url);
                const result = await data.json();
                console.log(result);
                if (mounted) {
                    setFavorites([...result])
                }
            } catch (error) {
                console.error(error);
            }
        }
        getFavorites();

        return () => {
            mounted = false;
        }
    }, [])


    console.log(favorites, "favs");
    return favorites.length !== 0 ? (

        <React.Fragment>

            <Row>
                <Col className='fav-list'>
                    <p className='fav-desc'>List of your favourites</p>
                    <ul className='fav-ul'>
                        {favorites.map(favorite => {
                            return <li key={favorite._id}>
                                <p>{favorite.name}</p>
                                <p>{favorite.phone}</p>

                            </li>
                        })}
                    </ul>
                </Col>
            </Row>

        </React.Fragment>
    ) : (<div>no</div>);
}

export default FavouritesList;

// const addFav = () => {
    //    setUser([...favourites, user._id]);
    // }