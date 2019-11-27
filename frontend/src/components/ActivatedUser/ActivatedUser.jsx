import React, { useState, useEffect, useContext } from "react";
import MessageComponent from '../Message/MessageComponent';
import { UserContext } from '../../AuthUserContext';



const ActivatedUser = (props) => {
    const { onActivation } = useContext(UserContext);
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setErrorShowMessage] = useState(false);
    const [activatedUser, setActivatedUser] = useState({});
    const handleMessageUnmount = () => {
        setShowMessage(false);
    }

    const accountId= props.match.params.id;
    onActivation(true);
    
    useEffect(() => {

        // read more about AbortController here https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7
        const controller = new AbortController();
        const signal = controller.signal;
        const activateAccount = async () => {
            const response = await fetch('/api/register/' + accountId, {signal: signal}).catch(err => console.error(err));
            const result = await response.json();
            if(response.ok) {
                setActivatedUser(result.user);
                setShowMessage(true);
                onActivation(false);
            }
            else {
                setErrorShowMessage(true);
            }
        }
        activateAccount();

        return function cleanup() {
            controller.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <React.Fragment>
            {showMessage ||showErrorMessage ? <MessageComponent 
            success={showMessage ? true : false}
            text={showMessage ? [`Dear ${activatedUser.name}! Your account is activated!`] : [`Account not found!`]} 
            unmountMe={handleMessageUnmount}
            redirectTo={'/login'}
        />
        : null}
        </React.Fragment>
    );
}

export default ActivatedUser;

