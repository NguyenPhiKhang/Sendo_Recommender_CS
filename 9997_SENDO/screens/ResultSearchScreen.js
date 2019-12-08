import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, NativeModules, Platform, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import CardProducts from '../components/CardProducts';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

export default class ResultSearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {valueText} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderBottomColor: 'rgb(51, 58, 68)', borderBottomWidth: 2, height: 60 }}>
                    <TouchableOpacity style={{ width: 30, height: 45, justifyContent: 'center', alignItems: 'center', flex: 0.05 }}
                        onPress={() => { this.props.navigation.navigate('Home'); }}>
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
                            value={valueText}
                        />
                        <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                            <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={35} color='#ec515a' />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View>
                    <FlatList
                        style={styles.flatList}
                        data={listArticles}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.title}
                        onEndReached={() => { !isLoadingRefresh ? this.getNews(true) : {} }}
                        onEndReachedThreshold={1}
                        ListFooterComponent={
                            lastPageReached ? <View style={styles.lastPage}>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: 'gray' }}>No more articles</Text>
                            </View> : <ActivityIndicator size="large" animating={isFooterLoading} />}
                        refreshing={isLoadingRefresh}
                        onRefresh={this.onRefresh}
                    />
                </View> */}
            </View>
        );
    }
}

ResultSearchScreen.navigationOptions = {
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