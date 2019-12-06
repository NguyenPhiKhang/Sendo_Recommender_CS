import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const { StatusBarManager } = NativeModules;

import CardProducts from '../components/CardProducts';
import SeenProducts from '../layouts/seenProducts';
import { ProductsSeen, ProductsNomina } from '../utils/data_test.js';
import {ConvertCurrency, renderStars, checkImageError} from '../constants/FunctionDefine';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

const ImageError = require('../assets/images/errorimage.png');

const listProducts = (data, navigate) => {
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
              onGoToProduct={navigate} />
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default class DetailsProductScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      totalImage: this.props.navigation.state.params.media.length,
      DataProductsSeen: ProductsSeen,
      DataProductsProvider: ProductsNomina,
      DataProductsNominated: ProductsNomina,
    }
  }

  setSelectedIndex = event => {
    // width of the viewSize
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    //get current position of the scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(contentOffset / viewSize) + 1;
    this.setState({ selectedIndex });
  }

  render() {
    const { media, name, disPercent, price, minPrice,
            shop_info, short_description, return_policy, rating_info:{total_rated} } = this.props.navigation.state.params;
    //this.setState({totalImage: media.length});
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
              media.map((image, idx) => {
                return (
                  <Image key={idx} style={styles.imgBackround} resizeMode="stretch"
                    source={(checkImageError(image.image_500x500 + "")) ? { uri: image.image_500x500 } : ImageError} />
                )
              })
            }
          </ScrollView>
          <View style={styles.btnOnTopImage}>
            <TouchableOpacity style={{ width: 30, height: 30, justifyContent: 'center' }}
              onPress={() => { this.props.navigation.goBack(); }}>
              <Ionicons color='#fff' name='ios-arrow-back' size={30} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginRight: 10, }}>
              <TouchableOpacity style={{ marginRight: 5 }} onPress={() => {this.props.navigation.push('Search')}}>
                <Ionicons name={Platform.OS == 'ios' ? 'ios-search' : 'md-search'} size={30} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={30} color='#ec515a' />
              </TouchableOpacity>
            </View>
          </View >
          <View style={styles.btnOnBottomImage}>
            <View style={{ backgroundColor: 'rgb(51, 58, 68)', width: 50, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 15 }}>{this.state.selectedIndex}/{this.state.totalImage}</Text>
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
              <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>{ConvertCurrency(minPrice + "")}đ</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ textDecorationLine: 'line-through', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)', marginLeft: 20 }}>{(disPercent < 1) ? ConvertCurrency(price + "") + "đ" : ""}</Text>
                <Text style={{ color: 'rgb(236, 81, 90)', fontSize: 20, fontWeight: 'bold', marginLeft: 6 }}>{(disPercent < 1) ? "-" + Math.ceil(100 - disPercent * 100) + "%" : ""}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
              {renderStars(total_rated, 17)}
        <Text style={{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.6)', }}>{total_rated} đánh giá</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
              <Image style={{ width: 16, height: 21 }} source={require('../assets/images/shoppingBag.png')} />
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10 }}>5 lượt mua</Text>
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
                source={(checkImageError(shop_info.shop_logo + "")) ? { uri: shop_info.shop_logo } : ImageError} />
              <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
                <Text style={{ fontSize: 20, color: "#fff" }}>{shop_info.shop_name}</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>{shop_info.warehourse_region_name}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{shop_info.product_total}</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Sản phẩm hiện có</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{shop_info.percent_response}</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Tỉ lệ phản hồi</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{shop_info.rating_avg}</Text>
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
                return_policy.map((item, idx) => {
                  return (
                    <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                      <Image style={{ width: 20, height: 25 }} source={require('../assets/images/vector.png')} />
                      <Text style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>{item.title}</Text>
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
            <Text style={{ color: 'rgb(199, 199, 204)', marginTop: 10, fontSize: 15 }}>{short_description}...</Text>
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
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>5/5</Text>
              <Text style={{ color: 'rgb(199, 199, 204)', marginLeft: 15 }}>2 đánh giá</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image style={{ height: 65, flex: 0.18 }} source={require('../assets/images/avatar.png')} />
              <View style={{ marginLeft: 10, flex: 0.62 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>Duy Anh</Text>
                <View style={{ flexDirection: "row" }}>{renderStars(5)}</View>
                <Text style={{ color: '#fff', fontWeight: '400' }}>Sản phẩn dịch vụ giống mô tả và tốt hơn mong đợi. Chất lượng sản phẩn tuyệt vời.</Text>
              </View>
              <Text style={{ fontSize: 10, color: 'rgb(199, 199, 204)', flex: 0.2 }}>3 tháng trước</Text>
            </View> */}
          </View>
          <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 30 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm cùng nhà cung cấp</Text>
            {listProducts(this.state.DataProductsProvider, this.props.navigation.navigate)}
          </View>
          <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm đề cử</Text>
            {listProducts(this.state.DataProductsNominated, this.props.navigation.navigate)}
          </View>
          <View style={{ marginTop: 20, marginLeft: 5 }}>
            <SeenProducts data={this.state.DataProductsSeen} />
          </View>
        </ScrollView>
        <View style={styles.viewBuy}>
          <TouchableOpacity style={styles.btnBuy} onPress={()=>{console.log("Mua ngay")}}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, }}>Mua Ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
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
    //padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: DEVICE_WIDTH,
    height: 35,
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