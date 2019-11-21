import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../AuthUserContext";

//ContextKeeper is a holder of UserContext. It checks if there is session (authenticated user)
//and saves it as user to UserContext
//All components are located inside of ContextKeeper and consume to UserContext
const ContextKeeper = props => {
	const { user, keepAuthUser } = useContext(UserContext);

    const [authUser, setAuthUser] = useState(false);

    const [ isLoading, setIsLoading ] = useState(true);

    const checkLogin = async () => {

        const response = await fetch('/api/login');
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
			{!user ? <Redirect to="/login" /> : null}
			{props.children}
		</div>
	);
};

export default ContextKeeper;
