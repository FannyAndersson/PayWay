import { useState } from 'react';

const UseAddFavourite = (callback) => {

    const [inputs, setInputs] = useState({ phone: '' })

    const [favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg] = useState(false);

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
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setFavoriteAlreadyExistsMsg,
        favoriteAlreadyExistsMsg
    };

}

export default UseAddFavourite;