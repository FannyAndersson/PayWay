import { useState } from 'react';

const UseAddFavourite = (callback) => {

    const [inputs, setInputs] = useState({ phone: '' })

    const [favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg] = useState(false);

    const [favoriteSuccessMsg, setFavoriteSuccessMsg] = useState(false);

    const [userDontExistMsg, setUserDontExistMsg] = useState(false);

    const [selfFavouriteMsg, setselfFavouriteMsg] = useState(false);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value }));

        setFavoriteAlreadyExistsMsg(false);
        setFavoriteSuccessMsg(false);
        setUserDontExistMsg(false);
        setselfFavouriteMsg(false);
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setFavoriteAlreadyExistsMsg,
        favoriteAlreadyExistsMsg,
        setFavoriteSuccessMsg,
        favoriteSuccessMsg,
        setUserDontExistMsg,
        userDontExistMsg,
        selfFavouriteMsg,
        setselfFavouriteMsg
    };

}

export default UseAddFavourite;