import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [resetPwd, setResetPwd] = useState(false);
    const [activation, setActivation] = useState(false);

    const keepAuthUser = (user) => {
        setUser(user);
    }

    const destroyAuthUser = () => {
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


