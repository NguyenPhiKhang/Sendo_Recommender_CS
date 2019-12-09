import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, NativeModules, Platform, TouchableOpacity,
    Image, FlatList, ActivityIndicator, RefreshControl
} from 'react-native';
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
            dataResult: [],
            textValue: '',
            isLoading: true,
            isFooterLoading: false,
            isHeaderLoading: false,
            pageNumber: 0,
            lastPageReached: false,
            isLoadingRefresh: false,
            isResult: true
        };
    }

    componentDidMount = async () => {
        this.getProductsSearch();
    }

    getProductsSearch = async (isFooterLoading = false) => {
        if (!this.state.lastPageReached) {
            const newPage = this.state.pageNumber + 1;
            this.setState({ isFooterLoading: isFooterLoading, textValue: this.props.navigation.state.params.valueText });
            const searchText = (this.props.navigation.state.params.valueText + '').replace(' ', '%20');
            const response = await fetch(`https://mapi.sendo.vn/mob/product/search?p=${newPage}&q=${searchText}`);
            const json = await response.json();
            const productsData = await json.data;
            if (typeof productsData !== 'undefined') {
                if (productsData !== []) {
                    const newProducts = await this.filterForUniqueProducts(this.state.dataResult.concat(productsData));
                    this.setState({ dataResult: newProducts, pageNumber: newPage, isLoading: false, isResult: true });
                }
                else {
                    this.setState({ lastPageReached: true });
                }
                this.setState({ isFooterLoading: false });
            }
            else {
                this.setState({ dataResult: [], pageNumber: 0, isLoading: false, isResult: false, lastPageReached: true, isFooterLoading: false });
            }
        }
        else { console.log("last page") }
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

    onRefresh = async () => {
        await this.setState({ dataResult: [], pageNumber: 0, isLoadingRefresh: true, lastPageReached: false });
        console.log(this.state.isLoadingRefresh);
        await this.getProductsSearch();
        this.setState({ isLoadingRefresh: false, })
    }

    renderItem = ({ item }) => {
        return (
            <CardProducts item={item} key={item.id}
                onGoToProduct={this.props.navigation.navigate} />
        )
    }

    onSearchKey = (value) => {
        if (value != '') {
            this.props.navigation.push('ResultSearch', { valueText: this.state.textValue });
        }
    }

    flatlistProduct = (state) => {
        const { dataResult, isFooterLoading, lastPageReached, isLoadingRefresh, isResult } = state;
        if (isResult) {
            return (
                <FlatList
                    style={styles.flatList}
                    data={dataResult}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => { !isLoadingRefresh ? this.getProductsSearch(true) : {} }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={
                        lastPageReached ? <View style={styles.lastPage}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: 'rgb(255,255,255,0.7)' }}>No more products</Text>
                        </View> : <ActivityIndicator size="large" animating={isFooterLoading} color='#fff' style={{ marginBottom: 20 }} />}
                    // refreshing={isLoadingRefresh}
                    // onRefresh={this.onRefresh}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoadingRefresh}
                            onRefresh={this.onRefresh.bind(this)}
                            //title="Pull to refresh"
                            tintColor="#fff"
                            titleColor="#fff"
                        />
                    }
                //bounces={false}
                />
            )
        }
        else {
            return (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>Không có kết quả tìm kiếm</Text>
                </View>
            )
        }
    }

    render() {
        const { valueText } = this.props.navigation.state.params;
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" animating={isLoading} color='#fff' />
                </View>);
        }
        else {
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
                                value={this.state.textValue}
                                onChangeText={(text) => { this.setState({ textValue: text }) }}
                                onSubmitEditing={() => this.onSearchKey(this.state.textValue + '')}
                                autoCorrect={false}
                            />
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => console.log('cart')}>
                                <Ionicons name={Platform.OS == 'ios' ? 'ios-cart' : 'md-cart'} size={35} color='#ec515a' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {this.flatlistProduct(this.state)}
                    </View>
                </View>
            );
        }
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
    flatList: {
        width: '100%',
        height: '100%'
    },
    lastPage: {
        alignItems: 'center',
        paddingBottom: 10,
    }
})