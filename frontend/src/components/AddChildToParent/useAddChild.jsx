import React, { useState } from 'react';
import { Modal } from 'react-materialize';

const useAddChild = (callback) => {


    const[ inputs, setInputs ] = useState({ phone: '' })

    const [showInvalidChild, setShowInvalidChild] = useState(false);

    const[generateSuccessMessage, setSuccesMessage] = useState(false);

    const [generateChildAlreadyExistInPendingMessage, setChildAlreadyExistInPending] = useState(false);

    const handleSubmit = (event) => {
        if(event){
            event.preventDefault()
        }
            setInputs('');


        callback()

    }

    const handleInputChange = (event) => {
        event.persist()


        setInputs(inputs => (
            {...inputs, [event.target.name]: event.target.value}
        ))

        setShowInvalidChild(false);
        setSuccesMessage(false);
        setChildAlreadyExistInPending(false);

    }


    return {
             inputs, handleSubmit, handleInputChange, setShowInvalidChild, showInvalidChild, setSuccesMessage, generateSuccessMessage, generateChildAlreadyExistInPendingMessage, setChildAlreadyExistInPending
           }
}

export default useAddChild;
