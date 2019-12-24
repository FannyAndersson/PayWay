import React, {useContext} from 'react';
import { UserContext } from "../../AuthUserContext";


const ToastNotification = (props) => {
    const {user} = useContext(UserContext);

    return (
        <React.Fragment>
            {props.data ? <div id="toast-container">
                <div className={'toast ' + (props.showMe ? 'on' : null)}>
                `You've got {props.data.amount} SEK from {props.data.sender.name}!`
                </div>
            </div> : null}
        </React.Fragment>
    );
}

export default ToastNotification;
