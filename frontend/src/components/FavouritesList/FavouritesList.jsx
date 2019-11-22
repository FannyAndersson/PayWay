import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';

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


    return favorites.length !== 0 ? (
        <Row>
            <Col m={6} s={12}>
                <h5>Your favorites:</h5>
                <Collection>
                    {favorites.map(favorite => {
                        return (
                            <Contact key={favorite._id} favorite={favorite} />
                        )
                    })}
                </Collection>
            </Col>
        </Row>
    ) : (
            <Row>
                <Col m={6} s={12}>
                    <p> You have not added any contacts to favorites</p>
                </Col>
            </Row>);
}

export default FavouritesList;

