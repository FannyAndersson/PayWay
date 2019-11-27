import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');
    const [activation,setActivation] = useState(false);

    const keepAuthUser = (user) => {
        setUser(user);
    }

    const destroyAuthUser = () => {
        setUser('');
    }

    const onActivation = () => {
        setActivation(true);
    }
    return (
        <UserContext.Provider value={{user, keepAuthUser: keepAuthUser, destroyAuthUser: destroyAuthUser, activation: activation, onActivation: onActivation}}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


