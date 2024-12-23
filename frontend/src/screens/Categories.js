import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import CategoriesLarge from '@components/CategoriesLarge';
import HeaderBar from '@components/HeaderBar';
import SortBar from '@components/SortBar';
import ProductItem from '@components/ProductItem';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import axios from 'axios';
import { useAuthContext } from "@contexts/AuthContext";
import { useRoute } from '@react-navigation/native'; // Dùng để nhận params
import { API_URL } from '../../../url';
export default function Categories() {
  const route = useRoute();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); // Sản phẩm đã sắp xếp
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState(route.params?.cate ? route.params.cate : null)
  const [sortOption, setSortOption] = useState("Nổi bật");   // Cách sắp xếp hiện tại
  const { user } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState("");

  // Lấy searchQuery từ params nếu có
  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery); // Cập nhật searchQuery từ params
    }
  }, [route.params?.searchQuery]);

  useEffect(() => {
    console.log(`${API_URL}`)
    console.log(user)
    axios
      .get(`${API_URL}/products/categories`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
        handleSortChange("Nổi bật"); // Gọi sắp xếp ngay khi tải xong
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSelectCategory = (category) => {
    if (selectCategory?.cate_name === category.cate_name) {
      setSelectCategory(null); // Bỏ chọn nếu nhấn vào danh mục đang được chọn
    } else {
      setSelectCategory(category); // Cập nhật danh mục mới
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option); // Cập nhật cách sắp xếp
  };
  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };
  const handleFilterAndSort = (category, sortOption) => {
    let filteredProducts = [...products];

    // Kiểm tra nếu có category hoặc searchQuery
    filteredProducts = filteredProducts.filter((product) => {
      const matchesCategory = category ? product.cate_id._id === category._id : null; // Khớp danh mục (nếu có)
      const matchesSearch = searchQuery
        ? normalizeString(product.prod_name).includes(normalizeString(searchQuery)) // Khớp tìm kiếm (nếu có)
        : null;

      // Lọc theo "hoặc" category hoặc searchQuery hoặc cả 2
      if (category && searchQuery) {
        return matchesCategory || matchesSearch; // Nếu có cả 2, "hoặc" chúng
      } else if (category) {
        return matchesCategory; // Nếu chỉ có category, lọc theo category
      } else if (searchQuery) {
        return matchesSearch; // Nếu chỉ có searchQuery, lọc theo searchQuery
      } else {
        return true; // Nếu không có gì, trả về tất cả
      }
    });

    // Sắp xếp sản phẩm
    switch (sortOption) {
      case "Mới nhất":
        filteredProducts.sort((a, b) => new Date(b.date_start_sale.$date) - new Date(a.date_start_sale.$date));
        break;
      case "Bán chạy":
        filteredProducts.sort((a, b) => b.prod_sold - a.prod_sold);
        break;
      case "Giá ↑↓":
        filteredProducts.sort((a, b) => a.prod_price - b.prod_price);
        break;
      case "Nổi bật":
        filteredProducts.sort((a, b) => b.prod_avg_rating - a.prod_avg_rating);
        break;
      default:
        break;
    }

    setSortedProducts(filteredProducts);
  };


  // Gọi hàm sắp xếp mỗi khi selectCategory hoặc products thay đổi
  useEffect(() => {
    handleFilterAndSort(selectCategory, sortOption);
  }, [selectCategory, sortOption, products, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.container}>
      <HeaderBar onSearch={handleSearch} />
        <View>
          {!loading && categories.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map((cate, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categories,
                    index !== categories.length - 1 && { marginRight: 10 },
                  ]}
                  onPress={() => handleSelectCategory(cate)}
                >
                  <CategoriesLarge
                    data={cate}
                    color={selectCategory?.cate_name === cate.cate_name ? '#E5A5FF' : '#C5C0F2'}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

        </View>
        <SortBar onSortChange={handleSortChange} />

        {/* SP */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.productListContainer}>
            <ScrollView contentContainerStyle={styles.productList}>
              {/* <View style={styles.productListSvgContainer}> */}
              <Svg width="100%" height="100%" style={styles.productListSvg}>
                <Defs>
                  <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0.2%" stopColor="#FFE1FF" stopOpacity="1" />
                    <Stop offset="99.8%" stopColor="#E5A5FF" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#gradient1)" rx="8" ry="8" />
              </Svg>
              {/* </View> */}

              {/* Hiển thị sản phẩm */}
              <View style={styles.productItemsContainer}>
                {sortedProducts.map((product, index) => (
                  <View
                    key={index}
                    style={[
                      styles.productItem,
                      index % 2 === 0 ? { paddingLeft: 10 } : { paddingRight: 10 },
                      index === 0 || index === 1 ? { paddingTop: 10 } : {},
                      index === sortedProducts.length - 1 || index === sortedProducts.length - 2 ? { paddingBottom: 10 } : {}
                    ]}
                  // style={styles.productItem}
                  >
                    <ProductItem data={product} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#241E92',
    gap: 20,
    flex: 1
  },
  categoriesContainer: {
    backgroundColor: '#241E92', // Đặt cùng màu nền với container
    paddingHorizontal: 10,
  },
  categories: {},
  productListContainer: {
    flex: 1,
    paddingBottom: 10
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // paddingTop: 5,
    // marginBottom: 10,
  },
  productListSvgContainer: {},
  productListSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  productItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex:1
  },
  productItem: {
    position: 'relative',
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 10,
  }
});
