import React from 'react';
import useRegisterUser from './RegisterUser';

const RegisterForm = () => {
  const onRegister= async ()=>{
try {
  const register = {
    name: inputs.name, 
    phone: inputs.phone, 
    email: inputs.email, 
    password: inputs.password
  }
  const response = await fetch('/api/register', {
method: 'POST', 
body: JSON.stringify(register), 
headers: {
  'Content-type': 'application/json'
}
  });
  const result = await response.json();
  console.log('SUCCESS: ', result);
} catch (error) {
    console.error('Error:', error);

}
}
  const {inputs, handleSubmit, handleInputChange} = useRegisterUser(onRegister)

    return (
        <>
        <div className="container registration-page center-align">
        <h3>Sign up!</h3>
        <div className="row">
        <form onSubmit={handleSubmit}>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input 
              placeholder="Enter your fullname" type="text" 
              className="validate" 
              name="name" 
              value={inputs.name}
               onChange={handleInputChange} />
              <label htmlFor="first_name">Name</label>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s6">
            <input 
            placeholder="Enter a valid phonenumber" type="text" 
            className="validate"
            name="phone" 
            value={inputs.phone}
             onChange={handleInputChange} />
            <label htmlFor="phoneNr">Phonenumber</label>
          </div>
        </div>
          <div className="row">
          <div className="input-field col s6">
            <input 
            placeholder="Enter a valid email" type="email" 
            className="validate" 
            name="email" 
            value={inputs.email} onChange={handleInputChange} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
          <div className="row">
            <div className="input-field col s6">
              <input 
              placeholder="Pick a password" type="password" 
              className="validate" 
              name="password" 
              value={inputs.password} 
              onChange={handleInputChange}/>
              <label htmlFor="Password">Password</label>
            </div>
          </div>
          <div className="row">
          <div className="col s6">
          <button className="submit-btn btn waves-effect waves-light" type="submit" value="submit">Submit</button>
          </div>
      </div>
      </div>
      </form>
      </div>
      </div>
      </>
    )
}

export default RegisterForm;
