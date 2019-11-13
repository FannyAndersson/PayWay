import React from 'react'

const Register = () => {
    return (
        <>
        <h3>Sign up!</h3>
        <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Enter your fullname" id="fullname" type="text" className="validate"/>
              <label htmlFor="first_name">Fullname</label>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s6">
            <input id="phonenumber" placeholder="Enter a valid phonenumber" type="number" className="validate"/>
            <label htmlFor="phonenumber">Phonenumber</label>
          </div>
        </div>
          <div className="row">
          <div className="input-field col s6">
            <input id="email" placeholder="Enter a valid email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="password" placeholder="Pick a password" type="password" className="validate"/>
              <label htmlFor="Password">Password</label>
            </div>
          </div>
        </form>
      </div>
      </>
    )
}

export default Register;
