import React, {useContext, useState} from "react";
import { UserContext } from "../UserContext";



//ContextKeeper is a holder of UserContext. It checks if there is session (authenticated user)
//and saves it as user to UserContext
//All components are located inside of ContextKeeper and consume to UserContext
const ContextKeeper = (props) => {
    const {getAuthUser} = useContext(UserContext);

    const [authUser, setAuthUser] = useState(false);
    const checkLogin =async () => {
        const response = await fetch('/api/login');
        const result = {user: await response.json(), status: response.status};
        if (result.user) {
            getAuthUser(result.user);
            setAuthUser(true);
        }
    }
    if(!authUser) {
        checkLogin();
    }
	return (
        <div>
            {props.children}
        </div>
	);
};

export default ContextKeeper;
