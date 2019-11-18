import React from 'react'
import {Modal, Button} from 'react-materialize'

const trigger = <Button>Registration completed</Button>

const registrationModal =()=>{
<div className="register-modal">
<Modal header="Modal Header" trigger={trigger}>
Registration completed
</Modal>
</div>
}


