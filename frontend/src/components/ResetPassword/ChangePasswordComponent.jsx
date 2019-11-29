import React, { useState, useContext, useEffect, useRef } from "react";
import { Col, Button, Divider } from "react-materialize";
import { Link } from "react-router-dom";
import MessageComponent from "../Message/MessageComponent";
import { UserContext } from "../../AuthUserContext";

const ChangePasswordComponent = () => {
	const { user, destroyAuthUser } = useContext(UserContext);
	const [showMessage, setShowMessage] = useState(false);
	const [showErrorMessage, setshowErrorMessage] = useState(false);
	const [notMatch, setNotMatch] = useState(false);
	const [inputs, setInputs] = useState("");
	const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(false);
    const componentIsMounted = useRef(true)

    
    useEffect(() => {
        return () => {
            componentIsMounted.current = false;
        }
    }, []);    

	const checkOldPassword = async () => {
		try {
			const response = await fetch("/api/check-password/", {
				method: "POST",
				body: JSON.stringify({
					email: user.email,
					password: inputs.oldPassword
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const result = await response.json();
			if (!response.ok && result.errorCode === "notMatch") {
				return setNotMatch(true);
			}
		} catch (error) {
			console.error("error: ", error);
		}
	};

	const cleanError = () => {
		setNotMatch(false);
	};

	const handleOnKeyUp = e => {
		setErrors({ ...errors, [e.target.name]: false });
	};

	const handleMessageUnmount = () => {
        if(showErrorMessage) {
            setShowMessage(false);
        }
        destroyUser();
	};

	const handleSubmit = event => {
		if (event) {
			event.preventDefault();
		}
		onResetPassword();
	};

	const handleInputChange = event => {
		event.persist();

		setInputs(inputs => ({
			...inputs,
			[event.target.name]: event.target.value
		}));
		if (Object.keys(inputs).length === 3) {
			setTouched(true);
		}
	};

	function validate(inputs) {
		let errors = {};
		if (!inputs.password) {
			errors.password = "Password is required";
		} else if (inputs.password.length < 5) {
			errors.password = "Password must be 5 characters at least";
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

	const onResetPassword = async () => {
		if (validate(inputs)) {
			try {
				const response = await fetch(
					"/api/change-password/" + user._id,
					{
						method: "POST",
						body: JSON.stringify({
							email: user.email,
							password: inputs.password
						}),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);

				if (response.ok) {
					setShowMessage(true);
				} else {
					setshowErrorMessage(true);
				}
			} catch (error) {
				console.error({ error: error });
			}
		}
	};

	const destroyUser = async () => {
		const logout = await fetch("/api/logout").catch(error =>
			console.error(error)
        );
		if (logout.ok) {
            destroyAuthUser();
		}
	};

	return (
		<React.Fragment>
			<Col node="form" onSubmit={handleSubmit}>
				<h1>Reset password</h1>
				<Col s={12} l={12} className="input-field inline">
					<input
						className="form-control"
						name="oldPassword"
						onChange={handleInputChange}
						value={inputs.oldPassword || ""}
						label="Enter old password"
						type="password"
						id="oldPwdf"
						s={12}
						l={12}
						required
						onBlur={componentIsMounted.current ? checkOldPassword : null}
                        onKeyUp={cleanError}
                        autoComplete="nope"
					/>
					<label htmlFor="oldPwdf" className="label">
						Enter old password
					</label>
					<span
						className={
							"helper-text error-helper " + (notMatch ? "on" : "")
						}
					>
						Old password doesn't match
					</span>
				</Col>
				<Divider />
				<Col s={12} l={12} className="input-field inline">
					<input
						className="form-control"
						name="password"
						onChange={handleInputChange}
						value={inputs.password || ""}
						label="Enter new password"
						type="password"
						id="passwordf"
						s={12}
						l={12}
						required
                        onKeyUp={handleOnKeyUp}
                        autoComplete="off"
                        
					/>
					<label htmlFor="passwordf" className="label">
						Enter new password
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
						label="Confirm new password"
						type="password"
						id="confirmPwdf"
						s={12}
						l={12}
						required
                        onKeyUp={handleOnKeyUp}
                        autoComplete="off"
                        
					/>
					<label htmlFor="confirmPwdf" className="label">
						Confirm new password
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
				<Col s={12} l={12} className="btn-group">
					<Button
						type="button"
						flat
						className="btn raised-btn"
						style={{ width: "49%" }}
						waves="light"
					>
						<Link to="/" title="Cancel">
							Cancel
						</Link>
					</Button>
					<Button
						disabled={!touched ? true : false}
						type="submit"
						waves="light"
						style={{ width: "49%" }}
					>
						Save
					</Button>
				</Col>
			</Col>
			{showMessage ? (
				<MessageComponent
					success={!showErrorMessage ? true : false}
					text={
						!showErrorMessage
							? [
									"Your password has been changed.",
									`Notification has been sent to ${user.email}`,
									"Log in with new password."
							  ]
							: ["Something went wrong, try again later."]
					}
					// redirectTo={!showErrorMessage ? "/login" : null}
					unmountMe={handleMessageUnmount}
				/>
			) : null}
		</React.Fragment>
	);
};

export default ChangePasswordComponent;
