import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Link } from "react-router-dom";


import {
    Row,
    Col,
    Collection
} from 'react-materialize';
import Contact from '../Contact/Contact';


const FavouritesList = () => {

    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let mounted = true;

        const getFavorites = async () => {
            try {
                const userID = user._id;
                let key = '/api/users/';
                let url = key + userID + '/favorites';
                const data = await fetch(url);
                const result = await data.json();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteFavorite = async (id) => {
        try {
            const newFavorites = favorites.filter(favorite => favorite._id !== id);
            const favoriteToDelete = favorites.find(favorite => favorite._id === id);
            setFavorites([...newFavorites])
            let path = "/api/delete-favourite/";
            let key = path + favoriteToDelete._id
            await fetch(key, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }

            });

        }
        catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Row>
            <Col m={6} s={12}>
                {favorites.length ?
                    <React.Fragment>
                        <h5 className="mb">My favorite contacts:</h5>
                        <Collection>
                            {favorites.map(favorite => {
                                return (
                                    <Contact key={favorite._id} favorite={favorite} deleteFavorite={deleteFavorite} />
                                )
                            })}
                        </Collection>
                    </React.Fragment>
                    :   <React.Fragment>
                        <p> You have not added any contacts to favorites</p>
                        <Link to="/profile/favorites/add-favorite" title="Add a contact to Favorites">Add a contact to Favorites</Link>
                    </React.Fragment> 
                    }
            </Col>
        </Row>
    );
}

export default FavouritesList;

