import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [resetPwd, setResetPwd] = useState(false);

    const keepAuthUser = (user) => {
        setUser(user);
    }

    const destroyAuthUser = () => {
        setUser('');
    }

    const onResetPassword = () => {
        setResetPwd(true);
    }
    return (
        <UserContext.Provider value={{user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser, resetPwd: resetPwd, onResetPassword: onResetPassword}}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


