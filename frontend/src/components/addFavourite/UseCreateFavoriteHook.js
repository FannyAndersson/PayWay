import { useState } from 'react';

const UseAddFavourite = (callback) => {

    const [inputs, setInputs] = useState({ phone: '' })

    const [favoriteAlreadyExistsMsg, setFavoriteAlreadyExistsMsg] = useState(false);

    const [favoriteSuccessMsg, setFavoriteSuccessMsg] = useState(false);

    const [userDontExistMsg, setUserDontExistMsg] = useState(false);

<<<<<<< HEAD
    const [selfFavouriteMsg, setselfFavouriteMsg] = useState(false);

=======
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4
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
<<<<<<< HEAD
        setselfFavouriteMsg(false);
=======
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4
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
<<<<<<< HEAD
        userDontExistMsg,
        selfFavouriteMsg,
        setselfFavouriteMsg
=======
        userDontExistMsg
>>>>>>> 104055869af2e83bbd8ab05951aa866e79e40bb4
    };

}

export default UseAddFavourite;