import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [noUserNeeds, setNoUserNeeds] = useState(false);

    const keepAuthUser = (user) => {
        setUser(user);
    }

    const destroyAuthUser = () => {
        setUser('');
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


