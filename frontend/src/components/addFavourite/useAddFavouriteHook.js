import {useState} from 'react';

const useAddFavourite = (callback) => {

const [inputs, setInputs] = useState({phone:''})

const handleSubmit = (event) => {
    if (event){
        event.preventDefault();
    }
    callback()
    }
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));

    }
    return {
        handleSubmit,
        handleInputChange,
        inputs
    };

}

export default useAddFavourite;