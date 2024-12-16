import React, { useEffect, useReducer, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../url";

// Tạo Context
export const AuthContext = createContext();

// Reducer cho quản lý trạng thái
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      AsyncStorage.setItem("user", JSON.stringify(action.payload)).catch(
        (err) =>
          console.error("Lỗi khi lưu thông tin user vào AsyncStorage:", err)
      );
      return {
        user: action.payload,
      };
    case "LOGOUT":
      AsyncStorage.removeItem("user").catch((err) =>
        console.error("Lỗi khi xóa AsyncStorage:", err)
      );
      AsyncStorage.removeItem("cartNouser").catch((err) =>
        console.error("Lỗi khi xóa giỏ hàng tạm thời:", err)
      );
      AsyncStorage.removeItem("cartNouserQuantity").catch((err) =>
        console.error("Lỗi khi xóa giỏ hàng tạm thời:", err)
      );
      return { user: null};
    case "UPDATE_CART_QUANTITY":
      return { ...state, totalQuantity: action.payload };
    case "UPDATE_CART_QUANTITY_NOLOGIN":
      return { ...state, totalQuantityNoLogin: action.payload };
    default:
      return state;
  }
};

// Provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    totalQuantity: 0,
    totalQuantityNoLogin: 0,
  });

  // Hàm đồng bộ thông tin người dùng từ server
  const syncUserInfo = async (user) => {
    if (!user || !user[0]._id) return user;
    const id = user[0]._id;
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`);
      if (!response.ok) {
        console.warn(`API không phản hồi đúng: ${response.status}`);
        return user;
      }
      const data = await response.json();
      console.log("Thông tin người dùng từ API:", data);
      return [{ ...user[0], ...data }, user[1]];
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng từ API:", error);
      return user; // Giữ nguyên thông tin nếu có lỗi
    }
  };

  // Hàm lấy số lượng giỏ hàng và cập nhật vào AuthContext
  const getQuantity = async () => {
    try {
      if (!state.user || !state.user[0]?._id) {
        console.warn("Không có thông tin người dùng hoặc user ID không hợp lệ.");
        return;
      }
      const user_id = state.user[0]._id;
      const res = await fetch(`${API_URL}/carts/quantity/${user_id}`);
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu giỏ hàng.");
      const data = await res.json();
      console.log("Số lượng giỏ hàng đã đăng nhập:", data.totalQuantity);
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: data.totalQuantity || 0,
      });
    } catch (error) {
      console.error("Error fetching cart quantity:", error);
    }
  };

  useEffect(() => {
    const loadAndSyncUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);

          // Đồng bộ thông tin người dùng từ server
          const updatedUser = await syncUserInfo(user);

          dispatch({ type: "LOGIN", payload: updatedUser });

          // Cập nhật lại AsyncStorage nếu có thay đổi
          if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
          }

          // Xóa giỏ hàng tạm thời và đồng bộ số lượng giỏ hàng
          await AsyncStorage.removeItem("cartNouser");
          await AsyncStorage.removeItem("cartNouserQuantity");
          await getQuantity();
        } else {
          // Nếu không có người dùng, lấy số lượng giỏ hàng từ AsyncStorage
          const storedQuantity = await AsyncStorage.getItem(
            "cartNouserQuantity"
          );
          if (storedQuantity) {
            dispatch({
              type: "UPDATE_CART_QUANTITY_NOLOGIN",
              payload: JSON.parse(storedQuantity),
            });
          }
        }
      } catch (error) {
        console.error("Lỗi khi đồng bộ thông tin người dùng:", error);
      }
    };

    loadAndSyncUser();
  }, []); 

  useEffect(() => {
    if (state.user) {
      AsyncStorage.setItem("user", JSON.stringify(state.user)).catch((err) =>
        console.error("Lỗi khi lưu thông tin vào AsyncStorage:", err)
      );
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
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

// import React, { useEffect, useReducer } from "react";
// import { createContext, useContext } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "../../../url";

// // Tạo Context
// export const AuthContext = createContext();

// // Reducer cho quản lý trạng thái
// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload,totalQuantity: 0, totalQuantityNoLogin: 0};
//     case "LOGOUT":
//       AsyncStorage.removeItem("user").catch((err) =>
//         console.error("Lỗi khi xóa AsyncStorage:", err)
//       );
//       return { user: null,totalQuantity: 0, totalQuantityNoLogin: 0};
//     case "UPDATE_CART_QUANTITY":
//       return { ...state, totalQuantity: action.payload };
//     case "UPDATE_CART_QUANTITY_NOLOGIN":
//       return { ...state, totalQuantityNoLogin: action.payload };
//     default:
//       return state;
//   }
// };

// // Provider
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { user: null });

//   // Hàm đồng bộ thông tin người dùng từ server
//   const syncUserInfo = async (user) => {
//     if (!user || !user[0]._id) return user;
//     const id = user[0]._id;
//     try {
//       const response = await fetch(`${API_URL}/api/users/${id}`);
//       if (!response.ok) {
//         console.warn(`API không phản hồi đúng: ${response.status}`);
//         return user; // Giữ nguyên thông tin cũ nếu lỗi
//       }
//       const data = await response.json();
//       return [{ ...user[0], ...data }, user[1]]; // Kết hợp dữ liệu
//     } catch (error) {
//       console.error("Lỗi khi cập nhật thông tin người dùng từ API:", error);
//       return user; // Giữ nguyên thông tin nếu xảy ra lỗi
//     }
//   };
//   // Hàm lấy số lượng giỏ hàng và cập nhật vào AuthContext
//   const getQuantity = async () => {
//     console.log("State user trong getQuantity:", state.user);

//     // Chỉ thực thi nếu `state.user` là một mảng và chứa `_id` hợp lệ
//     if (!state.user || !Array.isArray(state.user) || !state.user[0]?._id) {
//       console.warn("Không có user ID, không thể lấy số lượng giỏ hàng.");
//       try {
//         // Lấy số lượng giỏ hàng từ AsyncStorage nếu không có user
//         const totalQuantityNoLogin = await AsyncStorage.getItem(
//           "cartNouserQuantity"
//         );
//         console.log("Số lượng giỏ hàng từ AsyncStorage:", totalQuantityNoLogin);

//         // Nếu có giá trị trong AsyncStorage, cập nhật vào state
//         dispatch({
//           type: "UPDATE_CART_QUANTITY_NOLOGIN",
//           payload: totalQuantityNoLogin ? JSON.parse(totalQuantityNoLogin) : 0,
//         });
//       } catch (error) {
//         console.error("Lỗi khi lấy số lượng giỏ hàng từ AsyncStorage:", error);
//       }
//       return;
//     }

//     const user_id = state.user[0]._id;
//     console.log("User ID hợp lệ:", user_id);

//     try {
//       const res = await fetch(`${API_URL}/carts/quantity/${user_id}`);

//       if (!res.ok) {
//         throw new Error("Lỗi khi lấy dữ liệu giỏ hàng.");
//       }

//       const data = await res.json();
//       console.log("Số lượng giỏ hàng:", data.totalQuantity);

//       if (data && data.totalQuantity !== undefined) {
//         // Dispatch số lượng giỏ hàng mới vào context
//         dispatch({
//           type: "UPDATE_CART_QUANTITY",
//           payload: data.totalQuantity,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching cart quantity:", error);
//     }
//   };

//   useEffect(() => {
//     const loadAndSyncUser = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("user");
//         if (storedUser) {
//           const user = JSON.parse(storedUser);

//           // Đồng bộ thông tin người dùng từ server
//           const updatedUser = await syncUserInfo(user);

//           dispatch({ type: "LOGIN", payload: updatedUser });
//           if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
//             await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
//           }
//           await AsyncStorage.removeItem("cartNouser");
//           await AsyncStorage.removeItem("cartNouserQuantity")
//           await getQuantity();

//           if (updatedUser[0]?._id) {
//             await getQuantity();
//           }
//         } else {
//           // Nếu không có người dùng, lấy số lượng giỏ hàng từ AsyncStorage
//           const storedQuantity = await AsyncStorage.getItem(
//             "cartNouserQuantity"
//           );
//           if (storedQuantity) {
//             dispatch({
//               type: "UPDATE_CART_QUANTITY_NOLOGIN",
//               payload: JSON.parse(storedQuantity),
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Lỗi khi đồng bộ thông tin người dùng:", error);
//       }
//     };

//     loadAndSyncUser();
//   }, []);

//   // useEffect theo dõi sự thay đổi của 'user' và lưu vào AsyncStorage
//   useEffect(() => {
//     if (state.user) {
//       AsyncStorage.setItem("user", JSON.stringify(state.user)).catch((err) =>
//         console.error("Lỗi khi lưu thông tin vào AsyncStorage:", err)
//       );
//     }
//   }, [state.user]);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook để sử dụng AuthContext
// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error(
//       "useAuthContext must be used within an AuthContextProvider"
//     );
//   }
//   return context;
// };

// ===========================================================================================
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
