import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, NativeModules, Platform, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

import SeenProducts from '../layouts/seenProducts';
import { ProductsSeen } from '../utils/data_test.js';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataProductsSeen: ProductsSeen,
            textValue: '',
        };
    }

    onSearchKey = (value) => {
        if (value != '') {
            this.props.dispatch({type: 'dataSearchSuccess'})
            this.props.navigation.push('ResultSearch', {valueText: this.state.textValue});
        }
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
                            onSubmitEditing={()=>this.onSearchKey(this.state.textValue+'')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => { this.setState({ textValue: text+'' }) }}
                            value={this.state.textValue}
                            //controlled={true}
                        />
                        <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                            <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={35} color='#ec515a' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: '100%', height: 100, backgroundColor: 'rgb(41, 46, 54)',
                    paddingHorizontal: 15, justifyContent: 'center', alignContent: 'flex-start',
                    marginTop: 30, borderRadius: 15,
                }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', marginBottom: 20 }}>Tìm kiếm gần đây</Text>
                    <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10, textDecorationLine: 'underline' }}>Áo khoác nam</Text>
                    <Text style={{ color: "rgba(255, 255, 255, 0.6)", marginLeft: 10, textDecorationLine: 'underline' }}>Áo len nam</Text>
                </View>
                <View style={{
                    width: '100%', height: 180, backgroundColor: 'rgb(41, 46, 54)',
                    paddingHorizontal: 15, justifyContent: 'flex-start', alignContent: 'flex-start',
                    marginTop: 30, borderRadius: 15,
                }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', marginVertical: 10 }}>Xu hướng tìm kiếm</Text>
                </View>
                <View style={{ marginTop: 20, marginLeft: 5 }}>
                    <SeenProducts data={this.state.DataProductsSeen} />
                </View>
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