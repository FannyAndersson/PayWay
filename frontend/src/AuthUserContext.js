import React,  {createContext, useState} from 'react';
import io from 'socket.io-client';

const socket = io('/');

export const UserContext = createContext();

const handleCashFlow = (cash) => {

    // this is where we want to send a push notification
    console.log('You just got CA$H!', cash);

};

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [resetPwd, setResetPwd] = useState(false);
    const [activation, setActivation] = useState(false);

    const keepAuthUser = (newUser) => {

        setUser(newUser);

        if (!user || (newUser.id !== user.id)) {

            // listen for socket events containing newUsers id
            socket.on(`transaction-${newUser._id}`, handleCashFlow);

        }
    }

    const destroyAuthUser = () => {
        socket.off(`transaction-${user._id}`, handleCashFlow);
        setUser('');
    }

    const onActivation = () => {
        setActivation(true);
    }

    const onResetPassword = () => {
        setResetPwd(true);
    }


    return (
        <UserContext.Provider value={{user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser, activation: activation, onActivation: onActivation, resetPwd: resetPwd, onResetPassword: onResetPassword}}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


