import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
    loading: boolean;
    userId: string;
    setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/validateToken`, { withCredentials: true });
                console.log("Response from validateToken:", response.data);
                if (response.data.status) {
                    setIsLoggedIn(true);
                    setUserId(response.data.userId);
                }
                else{
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.log("Error during token validation:", err);
                setIsLoggedIn(false);
            }finally {
                setLoading(false); // Set loading to false after the check
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, loading, setIsLoggedIn, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
