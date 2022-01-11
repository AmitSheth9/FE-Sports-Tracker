import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signedIn, setSignedIn] = useState('')

    return <UserContext.Provider value={{username, setUsername, password, setPassword, signedIn, setSignedIn }}>{children}</UserContext.Provider>
}

const useUser = () => {
    const context = useContext(UserContext);

    if(context === undefined) {
        throw new Error('useUser must be used in UserProvider');
    }
    return context;
}

export { UserContext, UserProvider, useUser}