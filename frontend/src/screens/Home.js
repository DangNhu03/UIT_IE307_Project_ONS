import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, ActivityIndicator
} from 'react-native';
import { React, useState, useEffect } from 'react';
import ProductListItemMini from '../components/ProductListItemMini';
import HeaderBar from '../components/HeaderBar';
import CountdownTimer from '../components/CountdownTimer';
import ProductItem from '../components/ProductItem';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { API_URL } from "@env";

export default function Home() {
  const targetTime = 2 * 60 * 60 + 30 * 60; // 2 giờ 30 phút = 9000 giây

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET đến API của bạn
    fetch(`${API_URL}/products/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* HeaderBar */}
      <HeaderBar />

      {/* Sản phẩm */}
      <View style={styles.gridContainer}>
        {categories.map((category) => (
          <View key={category._id} style={styles.gridItem}>
            <Text style={{ margin: 0, padding: 0 }}>
              <ProductListItemMini text={category.cate_name} />  {/* Hiển thị tên danh mục */}
            </Text>
          </View>
        ))}
      </View>

      {/* Flash Deals */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.flashDealsContainer}>
          {/* Wrapper view for padding */}
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
            <TouchableOpacity style={styles.flashDealsSeeAll}>
              <Text style={styles.flashDealsSeeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.flashDealsContent}>
            {products.map((product, index) => (
              <View
                key={index}
                style={[styles.flashDealsItem, index !== products.length - 1 && { marginRight: 10 }]}
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
        <View style={styles.productList}>
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
                style={[styles.productItem, index % 2 === 0 ? { paddingLeft: 10 } : { paddingRight: 10 }]}
                // style={styles.productItem}
              >
                <ProductItem data={product} />
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241E92',
    paddingTop: 44,
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
    // marginBottom: 10,
    // marginTop: 10,
    borderRadius: 8,
  },
  flashDealsContainer: {
    // flex: 1,
    // position: 'relative', // SVG sẽ căn chỉnh với các thành phần khác trong container này
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 20,
    // flexDirection: 'column',
    gap: 5,
    minHeight: 330
  },
  flashDealsSvgContainer: {
    position: 'absolute', // Đảm bảo SVG phủ toàn bộ container
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
    width: '100%',
    height: 125,
    marginTop: 20,
  },
  productList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  productListSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  productItemsContainer:{
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
