import React from 'react'
import {Modal, Button} from 'react-materialize'

const RegistrationModal =()=>{
    return(
        <Modal
        header="You're good to go"
        fixedFooter
        trigger={
          <Button waves='light'>Modal</Button>
        }>
        <p>Registration Completed</p>
      </Modal>
  );
}

    export default RegistrationModal;




