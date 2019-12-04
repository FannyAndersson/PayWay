import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../AuthUserContext';
import MessageComponent from '../Message/MessageComponent';

const ConfirmChild = (props) => {
    // console.log(props, "props");
    const { onConfirmation } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);


    const handleMessageUnmount = () => {
        setShowMessage(false);
    }



    let id = props.match.params.id;

    useEffect(() => {
        let mounted = true;

        onConfirmation(true);

        console.log(props.match.params.id, "id");

        const confirmChild = async () => {
            try {
                let key = "/api/child/confirm-parent/";
                console.log("trying");
                const response = await fetch(key + id);
                console.log(response, "res");
                const result = await response.json();
                if (mounted && result.message) {
                    onConfirmation(false);
                    console.log("message");
                    // setShowMessage(true);
                    setMessage(result.message);
                }
                else {
                    if (mounted && result.error) {
                        console.log("error");
                        setErrorMessage(result.error)
                    }
                }
                console.log(result, "result");

            } catch (error) {
                console.error(error)

            }
        }

        confirmChild();

        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    console.log(message, "message");
    console.log(errorMessage, "errormessage");


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

export default ConfirmChild;