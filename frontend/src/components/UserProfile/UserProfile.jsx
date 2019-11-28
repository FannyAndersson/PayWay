import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../AuthUserContext";
import { Row, Col, TextInput, Button } from "react-materialize";
import MessageComponent from '../Message/MessageComponent';

const UserProfile = () => {
	const { user, keepAuthUser } = useContext(UserContext);
	const [errors, setErrors] = useState({});
	const [showMessage, setShowMessage] = useState(false);
	const handleMessageUnmount = () => {
    setShowMessage(false);
  };

	let initialState = {};
	if (user) {
		initialState = {
			phone: user.phone,
			name: user.name,
			email: user.email,
			limit: user.limit
		};
	}
	const [touched, setTouched] = useState(false);
    const [inputs, setInputs] = useState(initialState);

	const [touchedInputs, setTouchedInputs] = useState({});

	const handleSubmit = event => {
		if (event) {
			event.preventDefault();
		}
		onUpdateProfile();
	};

	const handleInputChange = event => {
		event.persist();
        setTouched(true);
		setTouchedInputs(touchedInputs => ({
			...touchedInputs,
			[event.target.name]: event.target.value
		}));
		setInputs(inputs => ({
			...inputs,
			[event.target.name]: event.target.value
		}));
	};

	const handleReset = () => {
		setInputs(initialState);
        setTouched(false);
        let labels = document.getElementsByClassName('label');
        for (let i = 0; i < labels.length; i++) {
            labels[i].classList.add('active');
        }
    };

    const handleOnKeyUp = (e) => {
        setErrors({...errors, [e.target.name]: false});
    }

	const catchError = err => {
        setErrors({...errors, [err.error]:true});
    };

	const onUpdateProfile = async () => {
		try {
			const body = {
				...touchedInputs
			};

			const response = await fetch("/api/profile/" + user._id, {
				method: "PUT",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const result = {
				response: await response.json(),
				status: response.status
			};

			if (result.status === 200) {
				setShowMessage(true);
				setTouched(false);
				keepAuthUser(result.response);
			}

			if (result.status === 500) {
				catchError(result.response);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<React.Fragment>
			<Row>
				<Col node="form" l={12} onSubmit={handleSubmit}>
					<h1>Profile</h1>
					<Col s={12} l={12} className="input-field inline">
						<input
							className="form-control"
							name="phone"
							onChange={handleInputChange}
							value={inputs.phone}
							label="Phone number"
							type="text"
							id="phonef"
							s={12}
							l={12}
                            required
                            onKeyUp={handleOnKeyUp}
						/>
						<label htmlFor="phonef" className="active label">
							Phone
						</label>
						<span
							className={"helper-text error-helper " + (errors.phone ? 'on' : '')}
						>
							User with such phone number already exists
						</span>
					</Col>
                    <Col s={12} l={12} className="input-field inline">
						<input
							className="form-control"
							name="email"
							onChange={handleInputChange}
							value={inputs.email}
							label="Email"
							type="text"
							id="emailf"
							s={12}
							l={12}
                            onKeyUp={handleOnKeyUp}
							required
						/>
						<label htmlFor="emailf" className="active label">
							Email
						</label>
						<span
							className={"helper-text error-helper " + (errors.email ? 'on' : '')}
						>
							User with such email number already exists
						</span>
					</Col>
					<TextInput
						className="form-control"
						name="name"
						onChange={handleInputChange}
						value={inputs.name}
						label="Name"
						type="text"
						s={12}
						l={12}
						required
					/>
					<TextInput
						className="form-control"
						name="limit"
						onChange={handleInputChange}
						value={String(inputs.limit)}
						label="Amount Limit"
						type="number"
						s={12}
						l={12}
					/>
					<Link to="/profile/reset-password" title="Reset password" s={12} l={12} className="forgot-your-pwd">Reset password</Link>
					<Col s={12} l={12} className="btn-group">
						<Button
							type="button"
							onClick={handleReset}
							disabled={!touched ? true : false}
							flat
							className="btn raised-btn"
							style={{ width: "49%" }}
							waves="light"
						>
							Cancel
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
			</Row>
			{showMessage ? <MessageComponent
                                success
                                redirectTo="/"
                                text={[`You have updated your profile`]}
                                unmountMe={handleMessageUnmount}
                            />
                            : null}
		</React.Fragment>
	);
};

export default UserProfile;
