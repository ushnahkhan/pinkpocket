import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('pinkpocket_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simple validation - any email with password length >= 6 works
        if (email && password && password.length >= 6) {
            const userData = {
                email: email,
                fullName: email.split('@')[0],
                isAdmin: email === "admin@pinkpocket.com"
            };
            setUser(userData);
            localStorage.setItem('pinkpocket_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const signup = (fullName, email, password) => {
        // Simple validation
        if (fullName && email && password && password.length >= 6) {
            const userData = {
                fullName: fullName,
                email: email,
                isAdmin: false
            };
            setUser(userData);
            localStorage.setItem('pinkpocket_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pinkpocket_user');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};