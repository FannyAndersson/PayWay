import React, { createContext, useState } from 'react';
import io from 'socket.io-client';
import ToastNotification from './components/ToastNotification/ToastNotification';

const socket = io('/');

export const UserContext = createContext();



const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [dataToast, setDataToast] = useState({});

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

    const handleToast = (cash) => {
        setDataToast(cash);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false); 
            setDataToast({});
        }, 5000);
    }

    const handleCashFlow = (cash) => {

        // this is where we want to send a push notification
        handleToast(cash);
    };


    return (
        <UserContext.Provider value={{ user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser }}>
            {props.children}
            {showToast ? <ToastNotification data={dataToast} showMe={true} /> : null}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


