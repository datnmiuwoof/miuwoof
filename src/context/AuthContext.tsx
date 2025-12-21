// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { jwtDecode } from "jwt-decode";

// interface AuthContextType {
//     userId: string | null;
//     token: string | null;
//     loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//     userId: null,
//     token: null,
//     loading: true,
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [userId, setUserId] = useState<string | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch("/api/auth/token")
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.token) {
//                     setToken(data.token);
//                     try {
//                         const decoded = jwtDecode<any>(data.token);
//                         const id = decoded.id || decoded.userId || decoded.sub || decoded._id;
//                         setUserId(id?.toString() || null);
//                     } catch (err) {
//                         console.log("Token lỗi, không giải mã được");
//                     }
//                 }
//             })
//             .catch((err) => console.error("Lấy token thất bại", err))
//             .finally(() => setLoading(false));
//     }, []);

//     return (
//         <AuthContext.Provider value={{ userId, token, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    userId: string | null;
    token: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode<any>(token);
                setUserId(decoded.id?.toString() || null);
                setToken(token);
            } catch (err) {
                console.log("Token không hợp lệ");
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ userId, token, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

