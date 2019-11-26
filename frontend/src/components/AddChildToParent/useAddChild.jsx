import { useState } from 'react';

const useAddChild = (callback) => {


    const[ inputs, setInputs ] = useState({ phone: '' })

    const [showInvalidChild, setShowInvalidChild] = useState(false);

    const [generateChildAlreadyExistInPendingMessage, setChildAlreadyExistInPending] = useState(false);

    const [selfMomMsg, setSelfMomMsg] = useState(false);

    const handleSubmit = (event) => {
        if(event){
            event.preventDefault()
        }

        setInputs('');

        callback();

    }

    const handleInputChange = (event) => {
        event.persist()


        setInputs(inputs => (
            {...inputs, [event.target.name]: event.target.value}
        ))

        setShowInvalidChild(false);
        setChildAlreadyExistInPending(false);
        setSelfMomMsg(false);

    }


    return {
             inputs, handleSubmit, handleInputChange, setShowInvalidChild, showInvalidChild, generateChildAlreadyExistInPendingMessage, setChildAlreadyExistInPending, selfMomMsg, setSelfMomMsg
           }
}

export default useAddChild;
