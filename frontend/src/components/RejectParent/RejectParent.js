import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../AuthUserContext';
import MessageComponent from '../Message/MessageComponent';

const RejectParent = (props) => {
    const { onRejection } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleMessageUnmount = () => {
        setShowMessage(false);
    }

    let id = props.match.params.id;

    useEffect(() => {
        let mounted = true;
        onRejection(true);

        const rejectParent = async () => {
            try {
                let key = "/api/child/reject-parent/";
                const response = await fetch(key + id);
                const result = await response.json();
                if (mounted && result.message) {
                    onRejection(false);
                    setMessage(result.message);
                }
                else {
                    if (mounted && result.error) {
                        setErrorMessage(result.error)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        rejectParent();
        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {message || errorMessage ? <MessageComponent
                success={message ? true : false}
                text={message ? [message] : [errorMessage]}
                unmountMe={handleMessageUnmount}
                redirectTo={'/'}
            /> : null}
        </React.Fragment >
    )
}

export default RejectParent;