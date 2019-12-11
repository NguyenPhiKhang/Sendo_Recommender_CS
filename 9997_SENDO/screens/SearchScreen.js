import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, NativeModules, Platform, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

import SeenProducts from '../layouts/seenProducts';
import { ProductsSeen } from '../utils/data_test.js';
import { filterForUniqueProducts } from '../constants/FunctionDefine';

const arr_xuhuong = [
    'áo len nam',
    'áo khoác nam',
    'iphone',
    'áo nam phong cách',
    'đồ len mùa đông',
    'gấu bông dễ thương'
]

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataProductsSeen: ProductsSeen,
            textValue: '',
        };
    }

    onSearchKey = async (value) => {
        console.log(value);
        if (value != '') {
            let a = await [].concat(value);
            let data = await filterForUniqueProducts(a.concat(this.props.dataSearch));
            await this.props.dispatch({ type: 'dataSearchSuccess', data: data });
            console.log(this.props.dataSearch);
            await this.props.navigation.push('ResultSearch', { valueText: value });
        }
    }

    seenProductFunction=()=>{
        if (this.props.dataProductSeen.length > 0) {
            return (
              <View style={{marginTop: 20}}>
                <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5 }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm vừa xem</Text>
                </View>
                <SeenProducts data={this.props.dataProductSeen} onGoToProduct={this.props.navigation.push} dispatch={this.props.dispatch}
                  dataSeen={this.props.dataProductSeen} />
              </View>
            )
          }
          return null;
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 30, height: 45, justifyContent: 'center', alignItems: 'center', flex: 0.05 }}
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Ionicons color='#fff' name='ios-arrow-back' size={30} />
                    </TouchableOpacity>
                    <View style={styles.SectionStyle}>
                        <Ionicons style={{ marginHorizontal: 5 }} name={Platform.OS == 'ios' ? 'ios-search' : 'md-search'} size={30} color='#fff' />
                        <TextInput
                            placeholder="Tìm kiếm trên Sendo"
                            underlineColorAndroid="transparent"
                            returnKeyType='search'
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            style={{ color: '#fff', width: 280 }}
                            autoFocus={true}
                            onSubmitEditing={() => this.onSearchKey(this.state.textValue + '')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => { this.setState({ textValue: text + '' }) }}
                            value={this.state.textValue}
                        //controlled={true}
                        />
                        <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                            <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={35} color='#ec515a' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: '100%', backgroundColor: 'rgb(41, 46, 54)',
                    paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
                    marginTop: 30, paddingBottom: 10, borderRadius: 15, alignSelf: 'baseline'
                }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', marginBottom: 20 }}>Tìm kiếm gần đây</Text>
                    {
                        this.props.dataSearch.map(item => {
                            return (
                                <TouchableOpacity key={item} style={{ margin: 1, alignSelf: 'baseline' }} onPress={() => { this.onSearchKey(item + '') }}>
                                    <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10, textDecorationLine: 'underline' }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{
                    width: '100%', alignSelf: "baseline", backgroundColor: 'rgb(41, 46, 54)',
                    paddingHorizontal: 15, justifyContent: 'flex-start', alignContent: 'flex-start',
                    marginTop: 30, borderRadius: 15, flexDirection:'row', flexWrap:'wrap'
                }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', marginVertical: 10, width: '100%' }}>Xu hướng tìm kiếm</Text>
                    {
                        arr_xuhuong.map(item => {
                            return (
                                <TouchableOpacity key={item} style={{borderRadius: 10, padding: 5, justifyContent: "center", 
                                alignItems:'center', alignSelf:'baseline', backgroundColor:'rgba(236, 81, 90, 0.1)', 
                                borderColor: 'rgb(236, 81, 90)', borderWidth: 0.2, margin: 6}} onPress={()=>{this.onSearchKey(item+'')}}>
                                    <Text style={{color:'rgba(255, 255, 255, 0.87)',}}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {/* <View style={{ marginTop: 20, marginLeft: 5 }}>
                    <SeenProducts data={this.state.DataProductsSeen} dataSeen={this.props.dataProductSeen} dispatch={this.props.dispatch} onGoToProduct={}/>
                </View> */}

                {this.seenProductFunction()}
                
            </View>
        );
    }
}


SearchScreen.navigationOptions = {
    header: null,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20242a',
        paddingTop: STATUSBAR_HEIGHT + 10,
        paddingHorizontal: 10,
    },
    SectionStyle: {
        flex: 0.95,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(51, 58, 68)',
        height: 45,
        borderRadius: 10,
        marginLeft: 10,
    },
})