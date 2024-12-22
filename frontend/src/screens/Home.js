import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import CategoriesMini from '../components/CategoriesMini';
import HeaderBar from '../components/HeaderBar';
import CountdownTimer from '../components/CountdownTimer';
import ProductItem from '../components/ProductItem';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import axios from 'axios';
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { API_URL } from '../../../url';

export default function Home() {

  const targetTime = 2 * 60 * 60 + 30 * 60; // 2 giờ 30 phút = 9000 giây

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  // Hàm handleSearch để gửi query lên trang Categories
  const handleSearch = (query) => {
    navigation.navigate('Categories', { searchQuery: query });
  };

  const { user } = useAuthContext();

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
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);
  // Ref để cuộn đến phần danh sách sản phẩm
  const scrollViewRef = useRef(null);
  const productListRef = useRef(null);

  // Hàm cuộn xuống phần danh sách sản phẩm
  const scrollToProductList = () => {
    productListRef.current?.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({
        y: pageY - 82, // Trừ chiều cao header
        animated: true,
      });
    });
  };
  const handleClickCate = (cate) => {
    navigation.navigate('Categories', { cate: cate })
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.container}>
        <HeaderBar onSearch={handleSearch} />
        <ScrollView ref={scrollViewRef}>
          <View style={styles.gridContainer}>
            {categories.map((category) => (
              <View key={category._id} style={styles.gridItem}>
                <Text style={{ margin: 0, padding: 0 }}>
                  <CategoriesMini text={category.cate_name} onClickCate={() => handleClickCate(category)} />
                </Text>
              </View>
            ))}
          </View>

          {/* Flash Deals */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.flashDealsContainer}>
              <View style={styles.flashDealsSvgContainer}>
                <Svg width="100%" height="100%" style={styles.flashDealsSvg}>
                  <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <Stop offset="0%" stopColor="#FFE1FF" stopOpacity="1" />
                      <Stop offset="50%" stopColor="#FFEFFF" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#FFF" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="100%" height="100%" fill="url(#grad)" />
                </Svg>
              </View>
              <View style={styles.flashDealsHeader}>
                <View style={styles.flashDealsTitle}>
                  <Text style={styles.flashDealsTitleText}>Flash deals</Text>
                  <Text style={styles.flashDealsTitleTime}>
                    <CountdownTimer targetTime={targetTime} />
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.flashDealsSeeAll}
                  onPress={scrollToProductList}
                >
                  <Text style={styles.flashDealsSeeAllText}>Xem tất cả sản phẩm</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.flashDealsContent}>
                {products
                  .filter((product) => product.prod_discount !== 0) // Lọc sản phẩm có prod_discount khác 0
                  .map((product, index) => (
                    <View
                      key={index}
                      style={[
                        styles.flashDealsItem,
                        index !== products.length - 1 && { marginRight: 10 },
                      ]}
                    >
                      <ProductItem data={product} />
                    </View>
                  ))}
              </ScrollView>
            </View>
          )}
          {/* Banner */}
          <Image
            source={require('../assets/imgs/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />

          {/* SP */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.productList} ref={productListRef}>
              {/* <View style={styles.productListSvg}> */}
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
                {products.map((product, index) => (
                  <View
                    key={index}
                    style={[
                      styles.productItem,
                      index % 2 === 0 ? { paddingLeft: 10 } : { paddingRight: 10 },
                      index === 0 || index === 1 ? { paddingTop: 10 } : {},
                      index === products.length - 1 || index === products.length - 2 ? { paddingBottom: 10 } : {}
                    ]}
                  // style={styles.productItem}
                  >
                    <ProductItem data={product} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241E92',
    // paddingTop: 44,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  gridItem: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // marginTop: 10,
    borderRadius: 8,
  },
  flashDealsContainer: {
    // flex: 1,
    // position: 'relative',
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 20,
    marginTop: 10,
    // flexDirection: 'column',
    gap: 5,
    minHeight: 330
  },
  flashDealsSvgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flashDealsSvg: {

  },
  flashDealsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 30,
  },
  flashDealsTitle: {
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
  },
  flashDealsTitleText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: '#241E92',
  },
  flashDealsTitleTime: {},
  flashDealsSeeAll: {},
  flashDealsSeeAllText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 21,
    color: '#241E92',
  },
  flashDealsContent: {},
  flashDealsItem: {},
  banner: {
    width: "100%",
    height: 121,
    marginTop: 20,
  },
  productList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // paddingTop: 5,
    // paddingBottom:10
    marginBottom: 10
  },
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
