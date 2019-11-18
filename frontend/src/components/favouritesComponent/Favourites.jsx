import React from 'react';
import Contact from '../Contact'
import { UserContext } from '../../userContext';
import { Row, Col, TextInput, Button } from 'react-materialize';

const Favourites = () => {

    const addFav = () => {
       setUser([...favourites, user._id]);
    }
    
    return (
        <UserContext.Consumer>
            {
                user => (
                    <React.Fragment>
                        <div className= 'fav-list'>
                            <ul>
                                {favourites.map(user_id =>{
                                    return (<li key={user_id}>{Favourites[i]}</li>)
                                })}
                            </ul>
                        </div>
                        
                        <TextInput className="form-control" label="Phone" phone={true} required />
                        <Button type ="submit" onclick= {addFav} waves ='light'>
                            Subbmit
                            <Icon right>
                                send
                                </Icon>
                        </Button>
                        </React.Fragment>


                )
            }

        </UserContext.Consumer >

    );
}



export default Favourites;