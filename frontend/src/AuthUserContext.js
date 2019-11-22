import React,  {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState('');

    const getAuthUser = (user) => {
        setUser(user);
    }
    return (
        <UserContext.Provider value={{user, getAuthUser: getAuthUser}}>
            {props.children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;


