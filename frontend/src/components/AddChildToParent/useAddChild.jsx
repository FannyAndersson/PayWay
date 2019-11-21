import { useState } from 'react';

const useAddChild = (callback) => {


    const[ inputs, setInputs ] = useState({ phone: '' })

    const [showInvalidChild, setShowInvalidChild] = useState(false);



    const handleSubmit = (event) => {
        if(event){
            event.preventDefault()


        }

        callback()
    }

    const handleInputChange = (event) => {
        event.persist()


        setInputs(inputs => (
            {...inputs, [event.target.name]: event.target.value}
        ))
        setShowInvalidChild(false);
    }

    return {
             inputs, handleSubmit, handleInputChange, setShowInvalidChild, showInvalidChild
           }
}

export default useAddChild;
