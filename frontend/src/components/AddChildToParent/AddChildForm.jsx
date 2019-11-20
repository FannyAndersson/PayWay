import React from 'react';
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
                   console.log(response, 'SUCCESS');
                 } else {
                   console.log('weee')
                 }

            }   catch (error) {
            console.error('Error:', error);
        }
        }

        const { inputs, handleInputChange, handleSubmit } = useAddChild(addChild);



    return <React.Fragment>
        <Row>
          <Col l={3} offset="l4" className="content">
            <h1>Add a child</h1>
            <Col node="form" l={12} className="form">
              <TextInput className="form-control" name="phone" onChange={handleInputChange} style={{ marginBottom: '40px' }} value={inputs.phone} label="Phone number" s={12} l={12} required />
              <Button flat={true} className="cancel-add-child-btn raised-btn" style={{ width: '48%' }} waves="light">
                <Link to="/mainpage">CANCEL</Link>
              </Button>
              <Modal header="Modal Header" trigger={<Button className="send-add-child-btn" waves="light" style={{ width: '48%', marginLeft: '11px' }}>
                    SEND
                  </Button>}>
                <p>Are you sure you want to continue?</p>
                <Button flat={true} onClick={handleSubmit} className="send-add-child-btn raised-btn" style={{ width: '48%' }} waves="light">
                  SEND
                </Button>
              </Modal>
            </Col>
          </Col>
        </Row>
      </React.Fragment>;
}

export default AddChildForm;