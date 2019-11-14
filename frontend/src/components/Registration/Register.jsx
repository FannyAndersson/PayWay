import React, {useState} from 'react'

const Register = () => {

const user =   {name: '',  phone: '', email: '', password: ''}
const [userState, setUserState] = useState(
  {...user}
)

const handleInputChange= (e) => setUserState({
  ...userState, 
  [e.target.name]: [e.target.value],
});

const handleSubmit = (e)=>{
  e.preventDefault();
  setUserState(...userState, {...user})
}
    return (
        <>
        <div className="container registration-page center-align">
        <h3>Sign up!</h3>
        <div className="row">
        <form onClick={handleSubmit} className="center-align">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Enter your fullname" id="fullname" type="text" className="validate" name={user.name} value={userState.user} required onChange={handleInputChange}/>
              <label htmlFor="first_name">Fullname</label>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s6">
            <input id="phone" placeholder="Enter a valid phonenumber" type="number" className="validate"/>
            <label htmlFor="phoneNr">Phonenumber</label>
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

export default Register;
