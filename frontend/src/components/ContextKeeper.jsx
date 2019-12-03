import React, { useContext, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { UserContext } from "../AuthUserContext";
import { Row, Col } from 'react-materialize';

//ContextKeeper is a holder of UserContext. It checks if there is session (authenticated user)
//and saves it as user to UserContext
//All components are located inside of ContextKeeper and consume to UserContext
const ContextKeeper = props => {
    const { user, keepAuthUser, resetPwd, onResetPassword, activation, onActivation } = useContext(UserContext);

    const [authUser, setAuthUser] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    let matchResetPassword = useRouteMatch("/reset-password/:id");

    if(matchResetPassword) {
        onResetPassword();
    }

    let matchActivateAccount = useRouteMatch("/activate-account/:id");

    if(matchActivateAccount) {
        onActivation();
    }

    
    const checkLogin = async () => {

        const response = await fetch('/api/login').catch(err => console.error(err, 'Error'));
        const result = { user: await response.json(), status: response.status };
        if (result.user) {
            keepAuthUser(result.user);
            setAuthUser(true);
        }

        setIsLoading(false);

    }
    if (!authUser) {
        checkLogin();
	}
    

    if (isLoading) {

        return (
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }

	return (
		<div>
			{!user && !activation && !resetPwd ? <Redirect to="/login" /> : null}
			<Row>
                <Col s={12} l={3} offset='l4'>
					{props.children}
                </Col>
            </Row>
		</div>
	);
};

export default ContextKeeper;
