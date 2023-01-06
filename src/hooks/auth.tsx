import React from 'react';
import { useEffect, useState } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {

        const user = localStorage.getItem('user');
        console.log(user)
        if (user) {
            try {
                setUser(JSON.parse(user));
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null)
            }
        }
        else {
            setUser(null)
            setIsAuthenticated(false)
        }

    }, [])
    return { user, isAuthenticated }
}
