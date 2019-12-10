import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const { StatusBarManager } = NativeModules;

import SeenProducts from '../layouts/seenProducts';
import ProviderProducts from '../layouts/providerProducts';
import ProductsOneLine from '../layouts/nominatedProductsoneLine';
import CardProducts from '../components/CardProducts';

import { ProductsSeen, ProductsNomina } from '../utils/data_test.js';
import { ConvertCurrency, renderStars, checkImageError } from '../constants/FunctionDefine';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

const ImageError = require('../assets/images/errorimage.png');

const listProducts = (data, navigate, dataSeen) => {
  //const { data, navigate } = props;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'column',
        }}>
        <View style={{ flexDirection: 'row' }}>
          {data.map(item => {
            return <CardProducts item={item} key={item.id}
              onGoToProduct={navigate} dataSeen={dataSeen}/>
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default class DetailsProductScreen extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      totalImage: 0,
      // DataProductsSeen: ProductsSeen,
      // DataProductsProvider: ProductsNomina,
      // DataProductsNominated: ProductsNomina,
      detailProduct: {},
      isLoading: true,
      dataProductRelateds: [],
      dataProductProvider: [],
      // isLoadingRelateds: true,
      // isLoadingProductNominate: true,
      // isLoadingProductSeen: true,
    }
  }

  getDataSearch = async (data) => {
    var dataProductRelateds = [];
    await Promise.all(data.map(async (item) => {
      var response = await fetch(`https://mapi.sendo.vn/mob/product/${item}/detail/`);
      var jsonData = await response.json();

      if (typeof jsonData.length === 'undefined') {
        let searchText = await (jsonData.name + "").replace(' ', '%20');
        let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
        let jsonSearch = await responseSearch.json();
        let productsData = await jsonSearch.data;
        dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
      }
    }));

    return dataProductRelateds;
  }

  filterForUniqueProducts = async (arr) => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  componentDidMount = async () => {
    this._isMounted = true;
    const id = await this.props.navigation.state.params.id;
    const responseDetail = await fetch(`https://mapi.sendo.vn/mob/product/${id}/detail/`);
    const jsonDataDetail = await responseDetail.json();
    const product_relateds = await jsonDataDetail.product_relateds;
    var arrIDRelateds = await product_relateds.split(',');
    if(this._isMounted)
      this.setState({ detailProduct: jsonDataDetail, totalImage: jsonDataDetail.images.length, isLoading: false, dataProductProvider: arrIDRelateds });
  }

  setSelectedIndex = event => {
    // width of the viewSize
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    //get current position of the scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(contentOffset / viewSize) + 1;
    this.setState({ selectedIndex });
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
    this._isMounted = false;
  }

  onGoBack=()=>{
    this.props.navigation.navigate('Home');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" animating={this.state.sLoading} color='#fff' />
        </View>);
    }
    else {
      const { percent_star } = this.props.navigation.state.params;
      const { images, name, final_price, final_promotion_percent, price, order_count,
        rating_info: { total_rated }, shop_info: { shop_logo, shop_name },
        customer_benefits: { benefits }, short_description, id } = this.state.detailProduct;

      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={{ width: '100%', height: 330 }}
              onMomentumScrollEnd={this.setSelectedIndex}
            // ref={this.scrollRef}
            >
              {
                images.map((image, idx) => {
                  return (
                    <Image key={idx} style={styles.imgBackround} resizeMode="stretch"
                      source={(checkImageError('https://media3.scdn.vn' + image + "")) ? { uri: 'https://media3.scdn.vn' + image } : ImageError} />
                  )
                })
              }
            </ScrollView>
            <View style={styles.btnOnTopImage}>
              <TouchableOpacity style={{ width: 30, height: 30, justifyContent: 'center' }}
                onPress={this.onGoBack}>
                <Ionicons color='#fff' name='ios-arrow-back' size={30} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', marginRight: 10, }}>
                <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { this.props.navigation.push('Search') }}>
                  <Ionicons name={Platform.OS == 'ios' ? 'ios-search' : 'md-search'} size={30} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                  <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={30} color='#ec515a' />
                </TouchableOpacity>
              </View>
            </View >
            <View style={styles.btnOnBottomImage}>
              <View style={{ backgroundColor: 'rgb(51, 58, 68)', width: 50, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 15 }}>{this.state.selectedIndex}/{images.length}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <TouchableOpacity style={styles.btnShareHeart} onPress={() => console.log('share')}>
                  <Ionicons name={Platform.OS == 'ios' ? 'ios-share' : 'md-share'} size={28} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShareHeart} onPress={() => console.log('heart')}>
                  <Ionicons name={Platform.OS == 'ios' ? 'ios-heart-empty' : 'md-heart-empty'} size={28} color='#fff' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              width: '100%', alignSelf: 'baseline', backgroundColor: 'rgb(41, 46, 54)', paddingHorizontal: 15,
              paddingVertical: 10, justifyContent: 'center', alignContent: 'flex-start'
            }}>
              <Text style={{ color: '#fff', fontSize: 19, }}>{name}</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>{ConvertCurrency(final_price + "")}đ</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ textDecorationLine: 'line-through', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)', marginLeft: 20 }}>{(final_promotion_percent > 0) ? ConvertCurrency(price + "") + "đ" : ""}</Text>
                  <Text style={{ color: 'rgb(236, 81, 90)', fontSize: 20, fontWeight: 'bold', marginLeft: 6 }}>{(final_promotion_percent > 0) ? "-" + final_promotion_percent + "%" : ""}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
                {renderStars(percent_star, 17)}
                <Text style={{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.6)', }}>{total_rated} đánh giá</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
                <Image style={{ width: 16, height: 21 }} source={require('../assets/images/shoppingBag.png')} />
                <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10 }}>{order_count} lượt mua</Text>
              </View>
            </View>
            <View style={{
              width: '100%', alignSelf: 'baseline', backgroundColor: 'rgb(41, 46, 54)',
              paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
              marginTop: 10, paddingVertical: 10
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Thông tin nhà cung cấp</Text>
                <TouchableOpacity onPress={() => console.log("nha cung cap")}>
                  <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Image style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={(checkImageError(shop_logo + "")) ? { uri: shop_logo } : ImageError} />
                <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
                  <Text style={{ fontSize: 20, color: "#fff" }}>{shop_name}</Text>
                  <Text style={{ color: 'rgb(199, 199, 204)' }}>Hồ Chí Minh</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 20 }}>149</Text>
                  <Text style={{ color: 'rgb(199, 199, 204)' }}>Sản phẩm hiện có</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 20 }}>40%</Text>
                  <Text style={{ color: 'rgb(199, 199, 204)' }}>Tỉ lệ phản hồi</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 20 }}>4.7</Text>
                  <Text style={{ color: 'rgb(199, 199, 204)' }}>Đánh giá</Text>
                </View>
              </View>
            </View>
            <View style={{
              width: '100%', alignSelf: 'baseline', backgroundColor: 'rgb(41, 46, 54)',
              paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
              marginTop: 10, paddingVertical: 10
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Quyền lợi khách hàng</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 25, height: 25 }} source={require('../assets/images/image7.png')} />
                  <Image style={{ width: 30, height: 20 }} source={require('../assets/images/image8.png')} />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                {
                  benefits.map((item, idx) => {
                    return (
                      <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5 }}>
                        <Image style={{ width: 20, height: 25 }} source={{ uri: item.icon_url }} />
                        <Text style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>{item.text}</Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>
            <View style={{
              width: '100%', alignSelf: 'baseline', backgroundColor: 'rgb(41, 46, 54)',
              paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
              marginTop: 10, paddingVertical: 10
            }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Mô tả chi tiết sản phẩm</Text>
              <Text style={{ color: 'rgb(199, 199, 204)', marginTop: 10, fontSize: 15 }}>{short_description}</Text>
              <TouchableOpacity style={{ marginTop: 5, alignItems: 'center' }} onPress={() => { console.log("Xem tất cả") }}>
                <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 18 }}>Xem tất cả ></Text>
              </TouchableOpacity>
            </View>
            <View style={{
              width: '100%', alignSelf: 'baseline', backgroundColor: 'rgb(41, 46, 54)',
              paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
              marginTop: 10, paddingVertical: 10
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Đánh giá và nhận xét</Text>
                <TouchableOpacity onPress={() => console.log("danh gia nhan xet")}>
                  <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{percent_star}/5</Text>
                <Text style={{ color: 'rgb(199, 199, 204)', marginLeft: 15 }}>{total_rated} đánh giá</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                <Image style={{ height: 65, flex: 0.18 }} source={require('../assets/images/avatar.png')} />
                <View style={{ marginLeft: 10, flex: 0.62 }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>Duy Anh</Text>
                  <View style={{ flexDirection: "row", marginBottom: 8 }}>{renderStars(5)}</View>
                  <Text style={{ color: '#fff', fontWeight: '400' }}>Sản phẩn dịch vụ giống mô tả và tốt hơn mong đợi. Chất lượng sản phẩn tuyệt vời.</Text>
                </View>
                <Text style={{ fontSize: 10, color: 'rgb(199, 199, 204)', flex: 0.2 }}>3 tháng trước</Text>
              </View>
            </View>
            <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 30 }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm cùng nhà cung cấp</Text>
              <ProviderProducts data={this.state.dataProductProvider} push={this.props.navigation.push} dispatch={this.props.dispatch} dataSeen={this.props.dataProductSeen}/>
            </View>
            <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 20 }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm đề cử</Text>
              {/* {listProducts(this.state.DataProductsNominated, this.props.navigation.navigate)} */}
              <ProductsOneLine idProduct={id} push={this.props.navigation.push} dispatch={this.props.dispatch} dataSeen={this.props.dataProductSeen} dataLogin={this.props.dataUserLogin}/>
            </View>
            <View style={{ marginTop: 20, marginLeft: 5 }}>
              <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm vừa xem</Text>
              </View>
              <SeenProducts data={this.props.dataProductSeen} onGoToProduct={this.props.navigation.push} dispatch={this.props.dispatch} dataSeen={this.props.dataProductSeen}/>
            </View>
          </ScrollView>
          <View style={styles.viewBuy}>
            <TouchableOpacity style={styles.btnBuy} onPress={() => { console.log("Mua ngay") }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, }}>Mua Ngay</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    };
  }
}


DetailsProductScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20242a',
  },
  scrollContainer: {
    flex: 0.92,
    //width: '100%',
    //backgroundColor: 'red',
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: '#20242a',
    flexDirection: 'column'
  },

  viewBuy: {
    //width: '100%',
    flex: 0.08,
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#3C3F43',
    borderTopWidth: 1,
  },
  btnBuy: {
    backgroundColor: '#B74D50',
    width: 144,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  imgBackround: {
    width: DEVICE_WIDTH,
    height: 330,
    //justifyContent: 'space-between'

    // shadowColor: 'rgba(0,0,0,0.2)',
    // shadowRadius: 50,
    // shadowOpacity: 1
  },
  btnShareHeart: {
    backgroundColor: 'rgb(51, 58, 68)',
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnOnTopImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: DEVICE_WIDTH,
    height: 48,
    paddingTop: 5,
    paddingHorizontal: 15,
    borderColor: 'white',
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  btnOnBottomImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    position: 'absolute',
    top: 270,
    left: 0,
    width: DEVICE_WIDTH - 20,
    height: 30,
    paddingHorizontal: 5,
  }
});