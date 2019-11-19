import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../AuthUserContext";

//ContextKeeper is a holder of UserContext. It checks if there is session (authenticated user)
//and saves it as user to UserContext
//All components are located inside of ContextKeeper and consume to UserContext
const ContextKeeper = props => {
	const { user, keepAuthUser } = useContext(UserContext);

	const [authUser, setAuthUser] = useState(false);
	const checkLogin = async () => {
		const response = await fetch("/api/login");
		const result = { user: await response.json(), status: response.status };
		if (result.user) {
			keepAuthUser(result.user);
			setAuthUser(true);
		}
	};
	if (!authUser) {
		checkLogin();
	}
	return (
		<div>
			{!user ? <Redirect to="/login" /> : null}
			{props.children}
		</div>
	);
};

export default ContextKeeper;
