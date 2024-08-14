import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const AllContent = useFirebase();
    return (
        <AuthContext.Provider value = {AllContent}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;