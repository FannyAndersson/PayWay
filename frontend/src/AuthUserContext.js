import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [resetPwd, setResetPwd] = useState(false);
    const [activation, setActivation] = useState(false);
    const [noUserNeeds, setNoUserNeeds] = useState(false);

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

    const onLinkFromEmail = () => {
        setNoUserNeeds(true);
    }


    return (
        <UserContext.Provider value={{user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser, noUserNeeds, onLinkFromEmail: onLinkFromEmail}}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


