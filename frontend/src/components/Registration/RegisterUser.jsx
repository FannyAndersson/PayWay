import  {useState, useEffect} from 'react'

const useRegisterUser = (callback, validate) => {
const [inputs, setInputs] = useState({name: '', phone: '', email: '', password: ''})
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)

useEffect(() => {
    if(Object.keys(errors).length === 0 && isSubmitting){
        callback();
    }
}, [callback, isSubmitting, errors])

const handleSubmit = (e)=>{
    if(e){
        e.preventDefault();
        setErrors(validate(inputs))
        setIsSubmitting(true);
}
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
    errors
}
}

  
export default useRegisterUser;
