import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, TextInput, Button, Modal } from 'react-materialize';
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
                   console.log(response, 'SUCCESS');
                 } else{
                   console.log('wee')
                   setShowInvalidChild(true);
                 }

            }   catch (error) {
            console.error('Error:', error);
        }
        }




        const { inputs, handleInputChange, handleSubmit, setShowInvalidChild, showInvalidChild } = useAddChild(addChild);


    return <React.Fragment>
        <Row>
          <Col l={3} offset="l4" className="content">
            <h1>Add a child</h1>
            <Col node="form" l={12} className="form">
              <TextInput
               name="phone"
               onChange={handleInputChange}
                style={{ marginBottom: '40px' }}
                 value={inputs.phone}
                 className={ `validate${showInvalidChild ? 'invalid' : ''}`}
                  label="Phone number"
                   s={12} l={12}
                   required />
                   {showInvalidChild ? (
              <p style={{ color: 'red' }}>There is no recipient with this phone number</p>
            ) : (
              ''
            )}
              <Button flat={true} className="cancel-add-child-btn raised-btn" style={{ width: '48%' }} waves="light">
                <Link to="/mainpage">CANCEL</Link>
              </Button>
                <Button flat={true} onClick={handleSubmit} className="send-add-child-btn" style={{ width: '48%', backgroundColor: '#6200EE', color: 'white', marginLeft:'11px' }} waves="light">
                      ADD CHILD
                    </Button>
            </Col>
          </Col>
        </Row>
      </React.Fragment>;
}

export default AddChildForm;