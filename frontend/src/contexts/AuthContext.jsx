import React, { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../url';

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

    // Hàm đồng bộ thông tin người dùng từ server
    const syncUserInfo = async (user) => {
        if (!user || !user[0]._id) return user; 
        const id=user[0]._id
        try {
            const response = await fetch(`${API_URL}/api/users/${id}`);
            if (!response.ok) {
                console.warn(`API không phản hồi đúng: ${response.status}`);
                return user; // Giữ nguyên thông tin cũ nếu lỗi
            }
            const data = await response.json();
            return [{ ...user[0], ...data }, user[1]]; // Kết hợp dữ liệu
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng từ API:", error);
            return user; // Giữ nguyên thông tin nếu xảy ra lỗi
        }
    };

    // Kiểm tra và tải dữ liệu người dùng từ AsyncStorage khi ứng dụng khởi động
    useEffect(() => {
        const loadAndSyncUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    const user = JSON.parse(storedUser);

                    // Đồng bộ thông tin người dùng từ server
                    const updatedUser = await syncUserInfo(user);

                    // Cập nhật vào state và AsyncStorage
                    dispatch({ type: 'LOGIN', payload: updatedUser });
                    if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
                        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
                    }
                }
            } catch (error) {
                console.error("Lỗi khi đồng bộ thông tin người dùng:", error);
            }
        };

        loadAndSyncUser();
    }, []);

    // useEffect theo dõi sự thay đổi của 'user' và lưu vào AsyncStorage
    useEffect(() => {
        if (state.user) {
            AsyncStorage.setItem("user", JSON.stringify(state.user))
                .catch(err => console.error("Lỗi khi lưu thông tin vào AsyncStorage:", err));
        }
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

// import React, { useEffect, useReducer } from "react";
// import { createContext, useContext } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Tạo Context
// export const AuthContext = createContext();

// // Reducer cho quản lý trạng thái
// export const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN':
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

//     // Kiểm tra và tải dữ liệu người dùng từ AsyncStorage khi ứng dụng khởi động
//     useEffect(() => {
//         const loadUser = async () => {
//             try {
//                 const user = await AsyncStorage.getItem("user");
//                 if (user) {
//                     dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
//                 }
//             } catch (error) {
//                 console.error("Lỗi khi tải thông tin người dùng từ AsyncStorage:", error);
//             }
//         };

//         loadUser();
//     }, []);

//     // useEffect theo dõi sự thay đổi của 'user' và lưu vào AsyncStorage
//     useEffect(() => {
//         if (state.user) {
//             AsyncStorage.setItem("user", JSON.stringify(state.user)); // Lưu thông tin người dùng vào AsyncStorage
//             console.log("Dữ liệu trong AsyncStorage:", state.user);
//         }
//     }, [state.user]);  // Lắng nghe sự thay đổi của 'user'

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
