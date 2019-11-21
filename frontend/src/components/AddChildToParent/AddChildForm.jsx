import React, {useEffect} from 'react';
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
              <TextInput name="phone" onChange={handleInputChange} style={{ marginBottom: '40px' }} value={inputs.phone} label="Phone number" s={12} l={12} required />
              <Button flat={true} className="cancel-add-child-btn raised-btn" style={{ width: '48%' }} waves="light">
                <Link to="/mainpage">CANCEL</Link>
              </Button>
              <Modal className="modal-send" actions={<p />} trigger={<Button className="send-add-child-btn" waves="light" style={{ width: '48%', marginLeft: '11px' }}>
                    ADD CHILD
                  </Button>}>
                <p
                  style={{
                    fontSize: '17px',
                    width: '100%',
                    marginBottom: '28px',
                    padding: '16px'
                  }}
                >
                  A mail is going to be sent to your child who has to
                  confirm you as a parent. Are you sure you want to
                  continue?
                </p>
                <Modal actions={<p />} trigger={<Button flat={true} onMouseDown={handleSubmit} modal="close" className="send-add-child-btn" style={{ width: '48%', backgroundColor: '#6200EE', color: 'white' }} waves="light">
                      SEND
                    </Button>}>
                  <p
                    style={{
                      fontSize: '17px',
                      width: '100%',
                      marginBottom: '28px',
                      padding: '16px'
                    }}
                  >
                    Your question has been sent. Do you want to add another
                    child or you want go back to your profile?
                  </p>
                  <Button flat={true} className="send-add-child-btn" modal="close" style={{ width: '48%', backgroundColor: '#6200EE', color: 'white' }} waves="light">
                    ADD CHILD
                  </Button>
                  <Button flat={true} className="send-add-child-btn" style={{ width: '48%', backgroundColor: '#fffff', border: 'solid', borderWidth: '0.6px', borderColor: '#6200EE', color: '#6200EE', marginLeft: '7px' }} waves="light">
                    <Link to="/mainpage">PROFILE</Link>
                  </Button>
                </Modal>
                <Button flat={true} className="send-add-child-btn" modal="close" style={{ width: '48%', backgroundColor: '#fffff', border: 'solid', borderWidth: '0.6px', borderColor: '#6200EE', color: '#6200EE', marginLeft: '7px' }} waves="light">
                 CANCEL
                </Button>
              </Modal>
            </Col>
          </Col>
        </Row>
      </React.Fragment>;
}

export default AddChildForm;