import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VoucherList from '@components/VoucherItem';
import { MaterialIcons } from '@expo/vector-icons';
import ArrowBack from "@components/ArrowBack";
import axios from 'axios';
import { useAuthContext } from "@contexts/AuthContext";

export default function Vouchers() {
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]);
  const [voucherNotStarted, setVoucherNotStarted] = useState([]);
  const [myVoucher, setMyVoucher] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSave, setIsSave] = useState(false); // Trạng thái isSave
  const { user } = useAuthContext();
  const user_id = user && user[0]?._id;
  const API_URL = 'http://192.168.137.1:5000';

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    axios
      .get(`${API_URL}/vouchers`, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setVouchers(response.data);
        const notStarted = response.data.filter(v => new Date(v.vouc_start_date) > new Date());
        setVoucherNotStarted(notStarted);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, [isSave]);

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API_URL}/api/user/${user_id}/vouchers`)
        .then((response) => {
          console.log('Dữ liệu trả về từ API:', response.data);
          setMyVoucher(response.data.vouchers);
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra khi lấy mã của tôi:', error);
        });
    }
  }, [user_id, isSave]);

  const handleUpdateSavedVouchers = (updatedVouchers) => {
    setMyVoucher(updatedVouchers);
    setIsSave(!isSave);
  };

  const AllScreen = () => {
    const filteredVouchers = vouchers.filter((v) =>
      v.vouc_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <VoucherList
          vouchers={filteredVouchers}
          myVoucher={myVoucher}
          onUpdateSavedVouchers={handleUpdateSavedVouchers}
        />
      )
    );
  };

  const NotStartedScreen = () => {
    const filteredVouchers = voucherNotStarted.filter((v) =>
      v.vouc_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <VoucherList vouchers={filteredVouchers} />
      )
    );
  };

  const MyVoucherScreen = () => {
    const filteredVouchers = myVoucher.filter((v) =>
      v.vouc_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <VoucherList vouchers={filteredVouchers} myVoucher={myVoucher} />
      )
    );
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Ưu đãi" />

      {/* Tab Navigation */}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: '#FF71CD',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            lineHeight: 16,
            textAlign: 'center',
            paddingBottom: 5,
          },
          tabBarActiveTintColor: '#FF71CD',
          tabBarInactiveTintColor: '#241E92',
          tabBarStyle: {
            height: 40,
            backgroundColor: '#FFF',
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="All"
          children={() => (
            <View style={styles.tabContent}>
              {/* Search Bar */}
              <View style={styles.searchBar}>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    placeholder="Nhập mã voucher..."
                    style={styles.searchBarInput}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                  />
                  <TouchableOpacity>
                    <MaterialIcons name="search" size={24} color="white" style={styles.searchBarIcon} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* All Screen Content */}
              <AllScreen />
            </View>
          )}
          options={{ title: `Tất cả (${vouchers.length})` }}
        />
        <Tab.Screen
          name="NotStarted"
          children={() => (
            <View style={styles.tabContent}>
              {/* Search Bar */}
              <View style={styles.searchBar}>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    placeholder="Nhập mã voucher..."
                    style={styles.searchBarInput}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                  />
                  <TouchableOpacity>
                    <MaterialIcons name="search" size={24} color="white" style={styles.searchBarIcon} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Not Started Screen Content */}
              <NotStartedScreen />
            </View>
          )}
          options={{ title: `Sắp diễn ra (${voucherNotStarted.length})` }}
        />
        {user && (
          <Tab.Screen
            name="MyVoucher"
            children={() => (
              <View style={styles.tabContent}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                  <View style={styles.searchBarContainer}>
                    <TextInput
                      placeholder="Nhập mã voucher..."
                      style={styles.searchBarInput}
                      value={searchQuery}
                      onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity>
                      <MaterialIcons name="search" size={24} color="white" style={styles.searchBarIcon} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* My Voucher Screen Content */}
                <MyVoucherScreen />
              </View>
            )}
            options={{ title: `Mã của tôi (${myVoucher.length})` }}
          />
        )}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241E92",  // Background color for the whole container
    paddingTop: 40,
    // marginBottom:10
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#241E92",  // Apply background color to the content area
    // marginBottom: 10,  // Adjust bottom padding if necessary
  },
  searchBar: {
    width: 390,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFCED6',
    paddingLeft: 6,
  },
  searchBarInput: {
    flex: 1,
    fontWeight: 'normal',
    fontSize: 14,
    paddingVertical: 0,
    paddingLeft: 4,
  },
  searchBarIcon: {
    backgroundColor: '#241E92',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
