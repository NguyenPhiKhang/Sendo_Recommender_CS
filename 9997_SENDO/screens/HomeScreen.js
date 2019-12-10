import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import ProgressBar from 'react-native-simple-progress-bar';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { throwStatement } from '@babel/types';

import FlashSale from '../layouts/FlashSale';
import SeenProducts from '../layouts/seenProducts';
import CategoriesNominated from '../layouts/nominatedCategories';
import ProductsNominated from '../layouts/nominatedProducts';
import EventsCarousel from '../layouts/EventsCarousel';

import { flashSale, ProductsSeen, CategoriesNomina, ProductsNomina, eventsCarousel } from '../utils/data_test.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataEventCarousel: eventsCarousel,
      DataFlashSale: flashSale,
      DataProductsSeen: ProductsSeen,
      DataCategoritesNominated: CategoriesNomina,
      DataProductsNominated: [],
      refreshing: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      //title: navigation.getParam('Title', 'SENHOME'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#20242a'),
        //Background color of ActionBar
        height: 60,
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#ffffff'),
      //Text color of ActionBar

      headerTitleStyle: {
        textAlign: 'left',
        alignItems: 'flex-start',
      },

      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { navigation.push('Search'); }}>
            <Ionicons name={Platform.OS == 'ios' ? 'ios-search' : 'md-search'} size={30} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => console.log('cart')}>
            <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={30} color='#ec515a' />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: (
        <Text style={{
          color: 'rgba(255,255,255,0.87)', fontSize: 30, fontWeight: 'bold', marginLeft: 10
        }}>SenHome</Text>
      ),
    };
  };

  async _onRefresh() {
    this.setState({ refreshing: true });
    await setTimeout(() => { this.setState({ refreshing: false }); }, 1000);
  }

  componentDidMount = async () => {
    const response = await fetch('http://amnhac.pro/public/index');
    const jsonData = await response.json();

    this.setState({ DataProductsNominated: jsonData });

    //console.log(this.state.DataProductsNominated);

    // const arr= [];
    // jsonData.map(item=>{
    //   const name = item.href.split('/');

    //   const dataArr = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${name}`);
    //   const data = dataArr['data'][0];

    //   arr.push(item.href);
    // });
    //console.log()
  }

  onPressCategories = () => {
    this.props.dispatch({ type: 'addDataCategories', data: this.state.DataCategoritesNominated });
    this.props.navigation.navigate('Categories');
  }

  render() {
    const { DataProductsNominated } = this.state;
    //console.log(DataProductsNominated);
    if (DataProductsNominated.length >0) {
      return (
        <View style={styles.container}>
          <ScrollView bounces={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />}
          >
            <EventsCarousel images={this.state.DataEventCarousel} />
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 50}}> */}
            <View style={{ flexDirection: 'row', height: 30, marginHorizontal: 10, marginTop: 20, marginBottom: 5, justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>FlashSale</Text>
              <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Text style={{ color: 'rgba(255,255,255,0.7)' }}>8:08:08</Text>
                <ProgressBar
                  fillStyle={{ backgroundColor: '#ec515a', height: 4 }}
                  style={{ width: 200, borderRadius: 10, height: 4, backgroundColor: 'silver', marginBottom: 5 }}
                  progress={0.8}
                />
              </View>
            </View>
            <FlashSale data={this.state.DataFlashSale} />
            <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm vừa xem</Text>
            </View>
            <SeenProducts data={this.state.DataProductsSeen} />
            <View style={styles.headerCategories}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Danh mục đề cử</Text>
              <TouchableOpacity style={{ marginRight: 10, marginRight: 16, marginTop: 2 }} onPress={this.onPressCategories}>
                <Ionicons color='#fff' name="ios-keypad" size={30} />
              </TouchableOpacity>
            </View>
            <CategoriesNominated data={this.state.DataCategoritesNominated} />
            <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm đề cử</Text>
            </View>
            <ProductsNominated datas={this.state.DataProductsNominated} navigate={this.props.navigation.navigate} />
          </ScrollView>
        </View>
      )
    }
    else{
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" animating={this.state.sLoading} color='#fff' />
        </View>);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20242a',
  },
  headerCategories: {
    height: 30,
    marginLeft: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
});
