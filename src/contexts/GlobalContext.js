import React, { createContext, useState } from 'react';


const Context = createContext({});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ email: '', password: '' });

    const login = (email, password) => {
        setUser((user) => ({
            email,
            password: password
        }));
    };

    const logout = () => {
        setUser((user) => ({
            email: '',
            password: ''
        }));
    };

    return (
        <Context.Provider value={{ user, login, logout }}>
            {children}
        </Context.Provider>
    )
}

export { UserProvider };