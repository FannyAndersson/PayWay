import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, TextInput, Button } from 'react-materialize';
import useAddChild from './useAddChild';


const AddChildForm = () => {

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
                   setSuccesMessage(true);
                   return;
                 }
                 if(response.status === 500) {
                   const error = await response.json();
                   if(error.errorCode === "selfMom") {
                     setSelfMomMsg(true);
                     return;
                   }
                 }
                 if(response.status === 405){
                   return setChildAlreadyExistInPending(true);
                 } 
                  setShowInvalidChild(true);
                  setSuccesMessage(false);

            }   catch (error) {
            console.error('Error:', error);
        }
        }


        const { inputs, handleInputChange, handleSubmit, setShowInvalidChild, showInvalidChild, setSuccesMessage, generateSuccessMessage, setChildAlreadyExistInPending, generateChildAlreadyExistInPendingMessage, selfMomMsg, setSelfMomMsg } = useAddChild(addChild);


    return <React.Fragment>
        <Row>
          <Col l={3} offset="l4" className="content">
            <h1>Add a child</h1>
            <Col node="form" onSubmit={handleSubmit} l={12} className="form">
              <TextInput
               name="phone"
               onChange={handleInputChange}
                 value={inputs.phone}
                 className={ `validate ${showInvalidChild || generateSuccessMessage || generateChildAlreadyExistInPendingMessage || selfMomMsg ? 'invalid' : ''}`}
                  label="Phone number"
                   s={12} l={12}
                   required />
                   {showInvalidChild ? (
              <p className="helper-text" style={{ color: 'red' }}>There is no recipient with this phone number</p>
            ) : (
              ''
            )}
            {generateSuccessMessage ? (
              <p className="helper-text" style={{ color: 'green' }}>A mail has been sent to your child who has to confirm you as a parent</p>
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
                <Link to="/mainpage">CANCEL</Link>
              </Button>
                <Button
                flat={true}
                 className="send-add-child-btn"
                  style={{ width: '47%', backgroundColor: '#6200EE', color: 'white', marginLeft:'11px' }} waves="light">
                      ADD CHILD
                    </Button>
            </Col>
          </Col>
        </Row>
      </React.Fragment>;
}

export default AddChildForm;