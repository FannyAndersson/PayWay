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
    
    const onClickHandler = () => {
        const favToDele = favourites[favourite._id];
        const response = await fetch('api/delete-favourite', {
            method: 'DELETE',
            body: JSON.stringify(favToDele),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        const result = {
            user: 
            await response.json(),
            status:response.status
            }

            if(result.status==200){
                console.log(result,'result success')
            }
                else {if(result.status==400){
                    console.log(result,'no such favourite')
                }
            }
                 
               
        }
    


    return (
        <Row>
            <Col m={6} s={12}>
            {favorites.length ? 
            <React.Fragment>
                <h5>Your favorites:</h5>
                <Collection>
                    {favorites.map(favorite => {
                        return (
                            <Contact key={favorite._id} favorite={favorite} onClick={onClickHandler} />
                        )
                    })}
                </Collection>
            </React.Fragment>
                 : <p> You have not added any contacts to favorites</p>}
            </Col>
        </Row>
    );
}

export default FavouritesList;

