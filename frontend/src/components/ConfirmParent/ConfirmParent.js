import React, { useEffect, useState } from 'react';
import MessageComponent from '../Message/MessageComponent';

const ConfirmParent = (props) => {
    // console.log(props, "props");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleMessageUnmount = () => {
        setShowMessage(false);
    }

    let id = props.match.params.id;

    useEffect(() => {
        let mounted = true;

        const confirmParent = async () => {
            try {
                let key = "/api/child/confirm-parent/";
                const response = await fetch(key + id);
                const result = await response.json();
                if (mounted && result.message) {
                    setMessage(result.message);
                    setShowMessage(true);
                }
                else {
                    if (mounted && result.error) {
                        setErrorMessage(result.error)
                        setShowMessage(true);

                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        confirmParent();

        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {showMessage ? <MessageComponent
                success={message ? true : false}
                text={message ? [message] : [errorMessage]}
                unmountMe={handleMessageUnmount}
                redirectTo={'/'}
            /> : null}
        </React.Fragment >
    )
}

export default ConfirmParent;