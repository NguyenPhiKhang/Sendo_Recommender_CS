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
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';
import { throwStatement } from '@babel/types';

import FlashSale from '../layouts/FlashSale';
import SeenProducts from '../layouts/seenProducts';
import CategoriesNominated from '../layouts/nominatedCategories';
import ProductsNominated from '../layouts/nominatedProducts';
import EventsCarousel from '../layouts/EventsCarousel';

import { flashSale, ProductsSeen, CategoriesNomina, ProductsNomina, eventsCarousel} from '../utils/data_test.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataEventCarousel: eventsCarousel,
      DataFlashSale: flashSale,
      DataProductsSeen: ProductsSeen,
      DataCategoritesNominated: CategoriesNomina,
      DataProductsNominated: ProductsNomina,
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
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#ffffff'),
      //Text color of ActionBar

      headerTitleStyle: {
        textAlign: 'left',
        alignItems: 'flex-start',
      },

      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => console.log('search')}>
            <Ionicons name={Platform.OS == 'ios' ? 'ios-search' : 'md-search'} size={35} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => console.log('cart')}>
            <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={35} color='#ec515a' />
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

  async _onRefresh(){
    this.setState({refreshing: true});
    await setTimeout(()=>{this.setState({refreshing: false});}, 1000);
  }

  render() {
    //console.log(this.state.DataFlashSale);
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
            <EventsCarousel images={this.state.DataEventCarousel}/>
            <FlashSale data={this.state.DataFlashSale} />
            <SeenProducts data={this.state.DataProductsSeen} />
            <CategoriesNominated data={this.state.DataCategoritesNominated} />
            <ProductsNominated data={this.state.DataProductsNominated}/>
        </ScrollView>
        {/* <Text>KAHNG PRO</Text> */}
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20242a',
  },

});
