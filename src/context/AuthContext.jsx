import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {

    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({isAuth: false, user: null, status: "done"})
        }
    }, []);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwtDecode(JWT);
        const email = decoded.sub;
        void fetchUserData(email, JWT, "/profiel");
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({isAuth: false, user: null, status: "done"});
        navigate("/");
    }

    async function fetchUserData(id, token, redirectUrl){
        try {
            const decoded = jwtDecode(token);

            const result = await axios.get(`${import.meta.env.VITE_API_KEY}/users/email/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: result.data.email,
                    id: result.data.id,
                    municipalityId: result.data.municipalityId,
                    municipalityName: result.data.municipalityName,
                    authorities: decoded.authorities,
                },
                status: "done"
            });
            if (redirectUrl) {
                navigate(redirectUrl);
            }
        } catch (err) {
            console.error(err);
            toggleIsAuth({isAuth: false, user: null, status: "done"});
        }
        }
    const contextData = {
        ...isAuth,
        login,
        logout,
    };


    return (
        <AuthContext.Provider value={contextData}>
            { isAuth.status === "done" ? children : <p>Een moment geduld aub</p>}
        </AuthContext.Provider>
    );
}

