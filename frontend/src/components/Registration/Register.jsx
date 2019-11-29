import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-materialize";
import useRegisterUser from "./useRegisterUser";
import MessageComponent from '../Message/MessageComponent';


const RegisterForm = () => {
	const [otherError, setOtherError] = useState(false);
	const [serverErrors, setServerErrors] = useState({});
	const catchError = err => {
		setServerErrors({ ...serverErrors, [err.error]: true });
	};
	const handleOnKeyUp = (e) => {
		setServerErrors({ ...serverErrors, [e.target.name]: false });
		setErrors({ ...errors, [e.target.name]: false });
	}

	//showMessage state and handleMessageUnmount are added to show and dismiss message
	const [showMessage, setShowMessage] = useState(false);
	const handleMessageUnmount = () => {
		setShowMessage(false);
	}
	const onRegister = async () => {
		if (validate(inputs)) {
			try {
				const register = {
					name: inputs.name,
					phone: inputs.phone,
					email: inputs.email,
					password: inputs.password
				};
				const response = await fetch("/api/register", {
					method: "POST",
					body: JSON.stringify(register),
					headers: {
						"Content-type": "application/json"
					}
				}).catch(err => {
					setOtherError(true);
					setShowMessage(true);
					return console.error(err);
				});
				let result = {};
				if (!response) {
					setOtherError(true);
					setShowMessage(true);
				}
				else {
					result = { response: await response.json(), status: response.status }
				}
				if (result) {
					if (result.status === 200) {
						setShowMessage(true);
						return;
					}
					if (result.status === 500) {
						catchError(result.response);
						return;
					}
				}
			} catch (error) {
				setOtherError(true);
			}
		}
	};

	function validate(inputs) {
		let errors = {};
		if (!inputs.name) {
			errors.name = "Name field cannot be empty";
		}
		if (!inputs.email) {
			errors.email = "Please type in a valid email";
		} else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
			errors.email = "Email is invalid";
		}
		if (!inputs.phone) {
			errors.phone = "Enter a phone number";
		} else if (!/^[0-9]/.test(inputs.phone)) {
			errors.phone = "Enter a valid phone number";
		}
		if (inputs.phone.length < 5) {
			errors.phone = "Your phone number must be more than 5 digits";
		}
		if (inputs.phone.length > 12) {
			errors.phone = "Your phone number can't be more than 12 digits";
		}
		if (!inputs.password) {
			errors.password = "Password is required";
		} else if (inputs.password.length < 5) {
			errors.password = "Password must be at least 5 or more characters";
		}
		if (!inputs.confirmPassword) {
			errors.confirmPassword = "Type in the password again";
		} else if (inputs.confirmPassword !== inputs.password) {
			errors.confirmPassword = "Password does not match";
		}
		setErrors(errors);

		if (Object.keys(errors).length) {
			return false;
		}
		return true;
	}

	const { handleSubmit, handleInputChange, inputs, errors, setErrors } = useRegisterUser(
		onRegister
	);

	return (
		<>
			<div className="registration-page container center-align">
				<Row>
					<Col l={4} offset="l4" className="content">
						<h3>Sign up!</h3>
						<form onSubmit={handleSubmit}>
							<Col s={12} l={12} className="input-field inline">
								<input
									className="form-control"
									name="name"
									onChange={handleInputChange}
									value={inputs.name || ""}
									label="Name"
									type="text"
									id="namef"
									s={12}
									l={12}
									required
									onKeyUp={handleOnKeyUp}
								/>
								<label htmlFor="namef" className="label">
									Name
								</label>
								<span
									className={
										"helper-text error-helper " +
										(errors.name ? "on" : "")
									}
								>
									{errors.name}
								</span>
							</Col>
							<Col s={12} l={12} className="input-field inline">
								<input
									className="form-control"
									name="phone"
									onChange={handleInputChange}
									value={inputs.phone || ""}
									label="Phone number"
									type="tel"
									id="phonef"
									s={12}
									l={12}
									required
									onKeyUp={handleOnKeyUp}
								/>
								<label
									htmlFor="phonef"
									className="label"
								>
									Phone number
								</label>
								<span
									className={
										"helper-text error-helper " +
										(errors.phone || serverErrors.phone ? "on" : "")
									}
								>
									{errors.phone}
									{serverErrors.phone ? 'User with such phone number already exists' : null}
								</span>
							</Col>
							<Col s={12} l={12} className="input-field inline">
								<input
									className="form-control"
									name="email"
									onChange={handleInputChange}
									value={inputs.email || ""}
									label="Email"
									type="email"
									id="emailf"
									s={12}
									l={12}
									required
									onKeyUp={handleOnKeyUp}
								/>
								<label
									htmlFor="emailf"
									className="label"
								>
									Email
								</label>
								<span
									className={
										"helper-text error-helper " +
										(errors.email || serverErrors.email ? "on" : "")
									}
								>
									{errors.email}
									{serverErrors.email ? 'User with such email address already exists' : null}
								</span>
							</Col>
							<Col s={12} l={12} className="input-field inline">
								<input
									className="form-control"
									name="password"
									onChange={handleInputChange}
									value={inputs.password || ""}
									label="Password"
									type="password"
									id="passwordf"
									s={12}
									l={12}
									required
									onKeyUp={handleOnKeyUp}
								/>
								<label
									htmlFor="passwordf"
									className="label"
								>
									Password
								</label>
								<span
									className={
										"helper-text error-helper " +
										(errors.password ? "on" : "")
									}
								>
									{errors.password}
								</span>
							</Col>
							<Col s={12} l={12} className="input-field inline">
								<input
									className="form-control"
									name="confirmPassword"
									onChange={handleInputChange}
									value={inputs.confirmPassword || ""}
									label="Confirm password"
									type="password"
									id="confpasswordf"
									s={12}
									l={12}
									required
									onKeyUp={handleOnKeyUp}
								/>
								<label
									htmlFor="confpasswordf"
									className="label"
								>
									Confirm password
								</label>
								<span
									className={
										"helper-text error-helper " +
										(errors.confirmPassword ? "on" : "")
									}
								>
									{errors.confirmPassword}
								</span>
							</Col>
							<Button
								flat={true}
								className="cancel-register-btn raised-btn"
								style={{ width: "48%" }}
								waves="light"
							>
								<Link to="/login">Cancel</Link>
							</Button>
							<Button
								className="submit-btn btn waves-effect waves-light"
								waves="light"
								style={{ width: "48%", marginLeft: "10px" }}
								type="submit"
								value="submit"
							>
								Submit
							</Button>
						</form>
					</Col>
				</Row>
			</div>
			{showMessage ? <MessageComponent
				success={otherError ? false : true}
				redirectTo={otherError ? null : "/login"}
				text={otherError ? [`Something went wrong! It happened on our side.`, `Try register later!`] : [`Account with email ${inputs.email} has been created.`, `Check your mailbox.`]}
				unmountMe={handleMessageUnmount}
			/>
				: null}
		</>
	);
};

export default RegisterForm;
