import  {useState, useEffect} from 'react'

const useRegisterUser = (callback, validate) => {
const [inputs, setInputs] = useState({})
const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)

useEffect(() => {
    if(Object.keys(errors).length === 0 && isSubmitting){
        callback();
           // eslint-disable-next-line react-hooks/exhaustive-deps
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
