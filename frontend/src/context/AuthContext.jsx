import React, { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo Context
export const AuthContext = createContext();

// Reducer cho quản lý trạng thái
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

// Provider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    // Kiểm tra và tải dữ liệu người dùng từ AsyncStorage khi ứng dụng khởi động
    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                if (user) {
                    dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
                }
            } catch (error) {
                console.error("Lỗi khi tải thông tin người dùng từ AsyncStorage:", error);
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

// import { createContext, useContext, useReducer } from "react";

// // Tạo Context
// export const AuthContext = createContext();

// // Reducer cho quản lý trạng thái
// export const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             return { user: action.payload };

//         case 'REGISTER':
//             return { user: action.payload };

//         case 'LOGOUT':
//             return { user: null };

//         default:
//             return state;
//     }
// };

// // Provider
// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(authReducer, { user: null });

//     return (
//         <AuthContext.Provider value={{ ...state, dispatch }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuthContext must be used within an AuthContextProvider");
//     }
//     return context;
// };
