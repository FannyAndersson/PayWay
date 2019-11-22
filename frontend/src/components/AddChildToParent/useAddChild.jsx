import React, { useState } from 'react';
import { Modal } from 'react-materialize';

const useAddChild = (callback) => {


    const[ inputs, setInputs ] = useState({ phone: '' })

    const [showInvalidChild, setShowInvalidChild] = useState(false);


    const handleSubmit = (event) => {
        if(event){
            event.preventDefault()
        }
            setInputs('');


        callback()
        return <modal>
            <div className="row">
              <div className="col s12">
                <span>
                  Something went wrong! Make sure that your account has
                  suffiecent funds and try again.
                </span>
              </div>
            </div>
        </modal>;

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
