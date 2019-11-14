import React, {useState} from 'react'

const Register = () => {
const [userName, setuserName] = useState('');
const handleSubmit = (e)=>{
  e.preventDefault()
// setName('')
console.log(e.target.value, 'event')
}
    return (
        <>
        <div className="container registration-page">
        <h3>Sign up!</h3>
        <div className="row">
        <form className="col s12" onClick={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Enter your fullname" id="fullname" type="text" className="validate" value={userName} required onChange={(e)=>setuserName(e.target.value)}/>
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
          <div className="row">
          <div className="col s6">
          <button className="btn waves-effect waves-light" type="submit" value="submit">Submit</button>
          </div>
          </div>
        </form>
      </div>
      </div>
      </>
    )
}

export default Register;
