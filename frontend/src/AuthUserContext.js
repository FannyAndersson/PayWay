import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [activation, setActivation] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [rejected, setRejected] = useState(false);


    const keepAuthUser = (user) => {
        setUser(user);
    }

    const destroyAuthUser = () => {
        setUser('');
    }

    const onActivation = () => {
        setActivation(true);
    }

    const onConfirmation = () => {
        setConfirmed(true);
    }

    const onRejection = () => {
        setRejected(true);
    }
    return (
        <UserContext.Provider value={{
            user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser, activation: activation, onActivation: onActivation, confirmed: confirmed, onConfirmation: onConfirmation,
            rejected: rejected, onRejection: onRejection
        }}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


