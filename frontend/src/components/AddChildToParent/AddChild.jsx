import { useState } from 'react';

const AddChild = (callback) => {

    const[ inputs, setInputs ] = useState({ phone: '' })

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
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange
    }
}

export default AddChild;
