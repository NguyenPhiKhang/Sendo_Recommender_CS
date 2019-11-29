import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const { StatusBarManager } = NativeModules;

import CardProducts from '../components/CardProducts';
import SeenProducts from '../layouts/seenProducts';
import { ProductsSeen, ProductsNomina } from '../utils/data_test.js';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

const detail_product = "Canon EOS M50 hứa hẹn sẽ tạo nên một bức phá lớn cho Canon trong thời gian tới.  Canon EOS M50 được tăng cường khả năng ghi hình 4K cũng như khả năng tương thích ngàm ống kính EF-M. Là máy ảnh không gương lật ống kính rời...";


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

const renderStars = (star) => {
  const fields = [];
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      fields.push(
        <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color='rgb(242, 201, 76)' size={17} />
      );
    }
    else {
      fields.push(
        <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color='silver' size={17} />
      );
    }
  }
  return fields;
};

export default class DetailsProductScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      totalImage: this.props.navigation.state.params.srcBackground.length,
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
    const { srcBackground } = this.props.navigation.state.params;
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
              srcBackground.map((image, idx) => {
                return <Image key={idx} style={styles.imgBackround} source={image.source} />
              })
            }
          </ScrollView>
          <View style={styles.btnOnTopImage}>
            <TouchableOpacity style={{ width: 30, height: 30, justifyContent: 'center' }}
              onPress={() => { this.props.navigation.goBack(); }}>
              <Ionicons color='#fff' name='ios-arrow-back' size={30} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity style={{ marginRight: 5 }} onPress={() => console.log('search')}>
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
          <View style={{ width: '100%', height: 150, backgroundColor: 'rgb(41, 46, 54)', paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start' }}>
            <Text style={{ color: '#fff', fontSize: 19, }}>Máy cơ Canon Pro 2019 phiên bản giới hạn </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>13.899.000đ</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ textDecorationLine: 'line-through', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)', marginLeft: 20 }}>15.899.000đ</Text>
                <Text style={{ color: 'rgb(236, 81, 90)', fontSize: 20, fontWeight: 'bold', marginLeft: 6 }}>-15%</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
              {renderStars(4)}
              <Text style={{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.6)', }}>2 đánh giá</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
              <Image style={{ width: 16, height: 21 }} source={require('../assets/images/shoppingBag.png')} />
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10 }}>5 lượt mua</Text>
            </View>
          </View>
          <View style={{
            width: '100%', height: 180, backgroundColor: 'rgb(41, 46, 54)',
            paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
            marginTop: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Thông tin nhà cung cấp</Text>
              <TouchableOpacity onPress={() => console.log("nha cung cap")}>
                <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('../assets/images/canonlogo.png')} />
              <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
                <Text style={{ fontSize: 20, color: "#fff" }}>Canon Chính hãng</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Hồ Chí Minh</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>149</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Sản phẩm hiện có</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>90%</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Tỉ lệ phản hồi</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>4.7</Text>
                <Text style={{ color: 'rgb(199, 199, 204)' }}>Đánh giá</Text>
              </View>
            </View>
          </View>
          <View style={{
            width: '100%', height: 130, backgroundColor: 'rgb(41, 46, 54)',
            paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
            marginTop: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Quyền lợi khách hàng</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/images/image7.png')} />
                <Image style={{ width: 30, height: 20 }} source={require('../assets/images/image8.png')} />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Image style={{ width: 20, height: 25 }} source={require('../assets/images/vector.png')} />
                <Text style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>7 ngày hoàn trả</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5 }}>
                <Image style={{ width: 20, height: 25 }} source={require('../assets/images/vector.png')} />
                <Text style={{ color: '#fff', fontSize: 10, fontSize: 17, marginLeft: 10 }}>Miễn phí hoàn trả</Text>
              </View>
            </View>
          </View>
          <View style={{
            width: '100%', height: 170, backgroundColor: 'rgb(41, 46, 54)',
            paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
            marginTop: 10
          }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Mô tả chi tiết sản phẩm</Text>
            <Text style={{ color: 'rgb(199, 199, 204)', marginTop: 10, fontSize: 15 }}>{detail_product}</Text>
            <TouchableOpacity style={{ marginTop: 5, alignItems: 'center' }}>
              <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 18 }}>Xem tất cả ></Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width: '100%', height: 180, backgroundColor: 'rgb(41, 46, 54)',
            paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
            marginTop: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Đánh giá và nhận xét</Text>
              <TouchableOpacity onPress={() => console.log("danh gia nhan xet")}>
                <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            </View>
          </View>
          <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 30 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm cùng nhà cung cấp</Text>
            {listProducts(this.state.DataProductsProvider, this.props.navigation.navigate)}
          </View>
          <View style={{ width: '100%', height: 230, paddingHorizontal: 15, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>Sản phẩm đề cử</Text>
            {listProducts(this.state.DataProductsNominated, this.props.navigation.navigate)}
          </View>
          <View style={{marginTop: 20, marginLeft: 5}}>
            <SeenProducts data={this.state.DataProductsSeen} />
          </View>
        </ScrollView>
        <View style={styles.viewBuy}>
          <TouchableOpacity style={styles.btnBuy}>
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
    width: 137,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  imgBackround: {
    width: DEVICE_WIDTH,
    height: 330,
    //justifyContent: 'space-between'
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
    margin: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: DEVICE_WIDTH - 20,
    height: 30,
    paddingHorizontal: 5,
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