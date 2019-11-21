import React, { useContext, useState } from "react";
import { UserContext } from "../../AuthUserContext";
import { Row, Col, TextInput, Button } from "react-materialize";

const UserProfile = () => {
    const { user, keepAuthUser } = useContext(UserContext);
    const [touched, setTouched] = useState(false);
    const [inputs, setInputs] = useState(
        {
            phone: user.phone,
            name: user.name,
            email: user.email,
            limit: user.limit 
        }
    );

    const [touchedInputs, setTouchedInputs] = useState({});

    const handleSubmit =(event) => {
        if(event) {
            event.preventDefault();
        }
        onUpdateProfile();
    }

    const handleInputChange = (event) => {
        event.persist();
        setTouched(true);
        setTouchedInputs(touchedInputs => ({...touchedInputs, [event.target.name]: event.target.value}));
        setInputs(inputs => (
            {...inputs, [event.target.name]: event.target.value}
        ));
    }


	const onUpdateProfile = async () => {
        try {
            const body = {
                ...touchedInputs
            }

            const response = await fetch('/api/profile/' + user._id, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            const result = {user: await response.json(), status: response.status}

            if (result.status === 200) {
                setTouched(false);
                keepAuthUser(result.user);
            }
        } catch (error) {
            console.error('Error:', error);
        }
	};

	return (
		<React.Fragment>
			<Row>
				<Col node="form" l={12} onSubmit={handleSubmit}>
					<h1>Profile</h1>
					<TextInput
						className="form-control"
						name="phone"
						onChange={handleInputChange}
						value={inputs.phone}
						label="Phone number"
						type="text"
						s={12}
						l={12}
						required
					/>
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
						name="email"
						onChange={handleInputChange}
						value={inputs.email}
						label="Email"
						email={true}
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
                    <Col s={12}
						l={12} className="btn-group">
                    <Button type="button" flat className="btn raised-btn" style={{width: '49%'}} waves="light">
                        Cancel
                    </Button>
                    <Button disabled={!touched ? true : false} type="submit" waves="light" style={{width: '49%'}}>
                        Save
                    </Button>
                    </Col>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default UserProfile;
