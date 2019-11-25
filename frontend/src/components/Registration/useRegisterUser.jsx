import { useState } from "react";

const useRegisterUser = (callback) => {
	const [inputs, setInputs] = useState({});
	const [errors, setErrors] = useState({});

	const handleSubmit = e => {
		if (e) {
			e.preventDefault();
		}
		callback();
	};

	const handleInputChange = e => {
		e.persist();
		setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
	};

	return {
		handleSubmit,
		handleInputChange,
		inputs,
		errors,
		setErrors
	};
};

export default useRegisterUser;
