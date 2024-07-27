import { getUserData } from "@/lib/api";
import { useEffect, useState } from "react";

function useAuth() {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            if (token) {
                setAuth(true);
                try {
                    const response = await getUserData(token);
                    setUser(response);
                } catch (err) {
                    if (err.response?.data?.msg === 'invalid') {
                        localStorage.removeItem('token');
                        setToken(null);
                    }
                }
            }
            setLoading(false);
        };

        if (token !== null) {
            checkAuth();
        }
    }, [token]);

    return { loading, auth, token, user };
}

export default useAuth;