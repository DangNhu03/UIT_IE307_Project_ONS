import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import Toast from "react-native-toast-message";
export function useAddToCart() {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;

  const updateCartQuantity = async () => {
    if (user_id) {
      try {
        const res = await axios.get(`${API_URL}/carts/quantity/${user_id}`);
        console.log("số lượng", res.data.totalQuantity);
        if (res.data && res.data.totalQuantity !== undefined) {
          // Dispatch the new cart quantity to the context
          dispatch({
            type: "UPDATE_CART_QUANTITY",
            payload: res.data.totalQuantity,
          });
        }
      } catch (error) {
        console.error("Error fetching cart quantity:", error);
      }
    } else {
      // If not logged in, update AsyncStorage
      const cartItems =
        JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
      const newQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      await AsyncStorage.setItem(
        "cartNouserQuantity",
        JSON.stringify(newQuantity)
      );
    }
  };

  // Add item to cart for logged-in user
  const addToCart = async (product_id, variant_id = null, quantity) => {
    try {
      setLoadingCart(true);
      setError(null);

      const res = await axios.post(`${API_URL}/carts/add`, {
        product_id: product_id,
        user_id: user_id,
        variant_id: variant_id || null,
        quantity: quantity,
      });

      if (res.status === 200) {
        setLoadingCart(false);
        // Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Thành công",
          text2: "Thêm vào giỏ hàng thành công",
        });
        updateCartQuantity();
      }
    } catch (error) {
      console.log("Error adding product to cart:", error);
      setError(error);
      setLoadingCart(false);
      Alert.alert("Lỗi", "Có lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  // Add item to cart for non-logged-in user (using AsyncStorage)
  const addToCartNoLogin = async (
    product,
    selectedVariant = null,
    quantity
  ) => {
    try {
      // Lấy giỏ hàng hiện tại từ AsyncStorage, nếu không có thì khởi tạo một mảng trống
      let cartItems =
        JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
      let found = false;
      const variant_id = product.prod_variations[selectedVariant]?._id;
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa, nếu có thì tăng số lượng
      cartItems.forEach((item) => {
        if (
          item.product_id === product._id &&
          ((variant_id && item.variant_id === variant_id) || (!variant_id && !item.variant_id))
        ) {
          item.quantity += quantity;
          found = true;
        }
      });
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào
      if (!found) {
        const cartItem = {
          product_id: product._id,
          variant_id: variant_id || null,
          prod_name: product.prod_name,
          prod_discount: product.prod_discount,
          image: variant_id
            ? product.prod_variations[selectedVariant]?.variant_image
            : product.prod_image[0],
          stock: product.prod_stock,
          variant_name: variant_id
            ? product.prod_variations[selectedVariant]?.variant_name
            : null,
          price: variant_id
            ? product.prod_variations[selectedVariant]?.variant_price
            : product.prod_price,
          quantity: quantity,
        };
        console.log("cartItem", cartItem);
        cartItems.push(cartItem);
      }

      // Lưu giỏ hàng đã cập nhật lại vào AsyncStorage
      await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));
      console.log("Updated cart items:", cartItems);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Thành công",
        text2: "Thêm vào giỏ hàng thành công",
      });

      // Tính tổng số lượng sản phẩm trong giỏ hàng và lưu vào AsyncStorage
      const totalQuantityNoLogin = cartItems.length;
      console.log(totalQuantityNoLogin);
      await AsyncStorage.setItem(
        "cartNouserQuantity",
        JSON.stringify(totalQuantityNoLogin)
      );
      dispatch({
        type: "UPDATE_CART_QUANTITY_NOLOGIN",
        payload: totalQuantityNoLogin,
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };
  const getCartNoLogin = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cartNouser");
      console.log("Giỏ hàng từ AsyncStorage:", cartItems); // Kiểm tra dữ liệu giỏ hàng
      const parsedItems = JSON.parse(cartItems) || [];
      return parsedItems;
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng từ AsyncStorage:", error);
      return []; // Trả về mảng trống nếu có lỗi
    }
  };

  const updateCartQuantityNoLogin = async (
    productId,
    variantId = null,
    newQuantity
  ) => {
    console.log(productId, variantId, newQuantity);
    try {
      // Lấy giỏ hàng từ AsyncStorage
      let cartItems =
        JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];

      // Tìm và cập nhật số lượng sản phẩm nếu có trong giỏ hàng
      const updatedCartItems = cartItems.map((item) => {
        if (item.product_id === productId && item.variant_id === variantId) {
          return {
            ...item,
            quantity: newQuantity, // Cập nhật số lượng
          };
        }
        return item;
      });

      // Lưu lại giỏ hàng đã cập nhật vào AsyncStorage
      await AsyncStorage.setItem(
        "cartNouser",
        JSON.stringify(updatedCartItems)
      );

      const totalQuantityNoLogin = updatedCartItems.length;
      await AsyncStorage.setItem(
        "cartNouserQuantity",
        JSON.stringify(totalQuantityNoLogin)
      );

      console.log("Cập nhật thành công cartItems: ", cartItems);
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật giỏ hàng.");
    }
  };

  const updateCartWithOrderList = async (orderListItems) => {
    try {
      let cartItems = JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
      
      orderListItems.forEach((orderItem) => {
        const { product_id, variant_id, quantity, prod_name, prod_discount, image, price, variant_name } = orderItem;
  
        let found = false;
        cartItems.forEach((item) => {
          if (item.product_id === product_id && item.variant_id === variant_id) {
            item.quantity = quantity;
            found = true;
          }
        });
  
        if (!found) {
          const newCartItem = {
            product_id,
            variant_id: variant_id || null,
            prod_name,
            prod_discount,
            image,
            price,
            variant_name,
            quantity,
          };
          cartItems.push(newCartItem);
        }
      });
  
      await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));
  
      const totalQuantityNoLogin = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      
      await AsyncStorage.setItem("cartNouserQuantity", JSON.stringify(totalQuantityNoLogin));
  
      dispatch({
        type: "UPDATE_CART_QUANTITY_NOLOGIN",
        payload: totalQuantityNoLogin,
      });
  
    } catch (error) {
      console.log("Error updating cart:", error);
    }
  };
  
  return {
    addToCart,
    loadingCart,
    error,
    addToCartNoLogin,
    getCartNoLogin,
    updateCartQuantityNoLogin,
    updateCartWithOrderList,
    updateCartQuantity,
  };
}

// import { useState } from "react";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Thay thế localStorage
// import { Alert } from "react-native";
// import { useAuthContext } from "@contexts/AuthContext";
// import { API_URL } from "../../../url";
// import { Animated } from "react-native";
// import Toast from "react-native-toast-message";
// export function useAddToCart() {
//   const { user, dispatch } = useAuthContext();
//   const [error, setError] = useState(null);
//   const [loadingCart, setLoadingCart] = useState(false);
//   //   const { getCartQuantity } = useAuthContext(); // Giả sử hook này đã có để lấy số lượng giỏ hàng
//   const user_id =
//     user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;

//   const addToCart = async (product_id, variant_id = null, quantity) => {
//     try {
//       setLoadingCart(true);
//       setError(null);

//       const res = await axios.post(`${API_URL}/carts/add`, {
//         product_id: product_id,
//         user_id: user_id,
//         variant_id: variant_id || null,
//         quantity: quantity,
//       });

//       if (res.status === 200) {
//         setLoadingCart(false);
//         Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
//         // Cập nhật giỏ hàng hoặc thông báo cho người dùng
//         // getCartQuantity(); // Cập nhật lại số lượng trong giỏ hàng (giả sử có hook này)
//       }
//     } catch (error) {
//       console.log("Error adding product to cart:", error);
//       setError(error);
//       setLoadingCart(false);
//       Alert.alert("Lỗi", "Có lỗi khi thêm sản phẩm vào giỏ hàng");
//     }
//   };
//   const addToCartNoLogin = async (prod, quantity, variant_id = null) => {
//     let cartItems = JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
//     let found = false;

//     cartItems.forEach((item) => {
//       if (item._id === prod._id && item.variant_id === variant_id) {
//         item.quantity += quantity;
//         found = true;
//       }
//     });

//     if (!found) {
//       const cartItem = {
//         ...prod,
//         variant_id: variant_id || null,
//         quantity: quantity,
//       };
//       cartItems.push(cartItem);
//     }

//     await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));
//     console.log("Updated cart items:", cartItems);
//     Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
//   };

//   const removeFromCartNoLogin = async (prodId, variant_id = null) => {
//     let cartItems = JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
//     cartItems = cartItems.filter(
//       (item) =>
//         item._id !== prodId ||
//         (item.variant_id && item.variant_id !== variant_id)
//     );
//     await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));
//     console.log("Updated cart items:", cartItems);
//   };

//   const updateQuantityNoLogin = async (
//     prodId,
//     newQuantity,
//     variant_id = null
//   ) => {
//     let cartItems = JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];
//     cartItems = cartItems.map((item) => {
//       if (item._id === prodId && item.variant_id === variant_id) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
//     await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));
//   };

//   return {
//     addToCart,
//     loadingCart,
//     error,
//     addToCartNoLogin,
//     removeFromCartNoLogin,
//     updateQuantityNoLogin,
//   };
// }
