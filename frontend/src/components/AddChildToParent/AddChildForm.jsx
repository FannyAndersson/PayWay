import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { TextInput, Button } from 'react-materialize';
import useAddChild from './useAddChild';
import MessageComponent from '../Message/MessageComponent';



const AddChildForm = () => {
      //showMessage state and handleMessageUnmount are added to show and dismiss message
      const [showMessage, setShowMessage] = useState(false);
      const handleMessageUnmount = () => {
          setShowMessage(false);
      }

    const addChild = async () => {

        try {
            const add = {
                phone: inputs.phone
            }
            const response = await fetch('/api/createchild', {
                method: 'POST',
                body: JSON.stringify(add),
                headers: {
                    'Content-Type': 'application/json'
                  }
            })

                 if (response.ok) {
                   setShowInvalidChild(false);
                   setShowMessage(true);
                   return;
                 }
                 if(response.status === 500) {
                   const error = await response.json();
                   if(error.errorCode === "selfMom") {
                     setSelfMomMsg(true);
                     return;
                   }
                   if(error.errorCode === "alreadyChild") {
                    return setChildAlreadyExistInPending(true);
                  }
                 }
                 if(response.status === 405){
                   return setChildAlreadyExistInPending(true);
                 }
                  setShowInvalidChild(true);

            }   catch (error) {
            console.error('Error:', error);
        }
        }


        const { inputs, handleInputChange, handleSubmit, setShowInvalidChild, showInvalidChild, setChildAlreadyExistInPending, generateChildAlreadyExistInPendingMessage, selfMomMsg, setSelfMomMsg } = useAddChild(addChild);


    return <React.Fragment>
            <h1>Add a child</h1>
            <form onSubmit={handleSubmit}>
              <TextInput
               name="phone"
               onChange={handleInputChange}
                 value={inputs.phone}
                 className={ `validate ${showInvalidChild || generateChildAlreadyExistInPendingMessage || selfMomMsg ? 'invalid' : ''}`}
                  label="Phone number"
                   s={12} l={12}
                   required />
                   {showInvalidChild ? (
              <p s={12} l={12} className="helper-text" style={{ color: 'red' }}>There is no recipient with this phone number</p>
            ) : (
              ''
            )}

            {generateChildAlreadyExistInPendingMessage ? (
              <p className="helper-text" style={{ color: 'orange' }}>You already send a request to this user</p>
            ) : (
              ''
            )}
            {selfMomMsg ? (
              <p className="helper-text" style={{ color: 'red' }}>You can not be a child to yourself!</p>
            ) : (
              ''
            )}
              <Button
              flat={true} type="button"
              className="cancel-add-child-btn raised-btn"
               style={{ width: '48%' }} waves="light">
                <Link to="/">CANCEL</Link>
              </Button>
                <Button
                flat={true}
                 className="send-add-child-btn"
                  style={{ width: '47%', backgroundColor: '#6200EE', color: 'white', marginLeft:'11px' }} waves="light">
                      ADD CHILD
                    </Button>
            </form>
        {showMessage ? <MessageComponent
                                success
                                redirectTo="/profile/children/"
                                text={[`A mail has been sent to ${inputs.phone} who has to confirm you as a parent`]}
                                unmountMe={handleMessageUnmount}
                            />
                            : null}
      </React.Fragment>;
}

export default AddChildForm;