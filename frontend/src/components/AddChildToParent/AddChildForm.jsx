import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, TextInput, Button } from 'react-materialize';
import AddChild from './AddChild';

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
                console.log(response)
                const result = await response.json();
                console.log('SUCCESS: ', result);

            }   catch (error) {
            console.error('Error:', error);
        }
        }

        const { inputs, handleInputChange, handleSubmit } = AddChild(addChild);


    return <React.Fragment>
        <Row>
          <Col l={3} offset="l4" className="content">
            <h1>Add a child</h1>
            <Col node="form" onSubmit={handleSubmit} l={12} className="form">
              <TextInput className="form-control" name="phone" onChange={handleInputChange} value={inputs.phone} label="Phone number" s={12} l={12} required />
              <Button className="cancel-add-child-btn" waves="light" style={{ width: '100%' }}>
                <Link to="/mainpage">CANCEL</Link>
              </Button>
            </Col>
            <Col s={12} l={12} style={{ marginTop: '20px' }}>
              <Button flat={true} className="send-add-child-btn raised-btn" style={{ width: '100%' }} waves="light">
                SEND
              </Button>
            </Col>
          </Col>
        </Row>
      </React.Fragment>;
}

export default AddChildForm;