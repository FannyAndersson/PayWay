import  {useState} from 'react'

const useRegisterUser = (callback) => {
const [inputs, setInputs] = useState({name: '', phone: '', email: '', password: ''})
const handleSubmit = (e)=>{
    if(e){
        e.preventDefault();
    }
    callback()
}
const handleInputChange = (e)=>{
    e.persist();
    setInputs(inputs =>({...inputs, 
        [e.target.name]: e.target.value}));
}
return {
    handleSubmit,
    handleInputChange, 
    inputs, 
}
}
  
export default useRegisterUser;
