import { useState } from 'react';

const useLoginForm = (callback) => {
    //initialize state variable
    const [inputs, setInputs] = useState({ email: '', password: '' });

    //create function to manage submit event
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value }));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}

export default useLoginForm;