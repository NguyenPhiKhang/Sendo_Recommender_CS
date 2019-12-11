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

export default class ProductCategoriesScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dataResult: [],
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
        this._isMounted = true;
        this.getProductsSearch();
    }

    getProductsSearch = async (isFooterLoading = false) => {
        const{idlv1, lv2, lv3, kind} = this.props.navigation.state.params;
        if (!this.state.lastPageReached) {
            const newPage = this.state.pageNumber + 1;
            if (this._isMounted)
                this.setState({ isFooterLoading: isFooterLoading});
                var response;
                if(kind===1)
                    response = await fetch(`https://mapi.sendo.vn/mob/product/cat/${idlv1}?p=${newPage}`);
                else response = await fetch(`https://mapi.sendo.vn/mob/product/cat/${idlv1}/${lv2.id}/${lv3.id}?p=${newPage}`);
            const json = await response.json();
            const productsData = await json.data;
            //console.log(productsData);
            if (typeof productsData !== 'undefined') {
                if (productsData !== []) {
                    const newProducts = await this.filterForUniqueProducts(this.state.dataResult.concat(productsData));
                    if (this._isMounted)
                        this.setState({ dataResult: newProducts, pageNumber: newPage, isLoading: false, isResult: true });
                }
                else {
                    if(this._isMounted)
                    this.setState({ lastPageReached: true });
                }
                if(this._isMounted)
                this.setState({ isFooterLoading: false });
            }
            else {
                if(this._isMounted)
                this.setState({ dataResult: [], pageNumber: 0, isLoading: false, isResult: false, lastPageReached: true, isFooterLoading: false });
            }
        }
        else { console.log("last page") }
    }

    componentWillUnmount(){
        this._isMounted = false;
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
                onGoToProduct={this.props.navigation.push} dispatch={this.props.dispatch} dataSeen={this.props.dataProductSeen} />
        )
    }

    onSearchKey = async (value) => {
        if (value != '') {
            let a = await [].concat(value);
            let data = await this.filterForUniqueProducts(a.concat(this.props.dataSearch));
            await this.props.dispatch({ type: 'dataSearchSuccess', data: data });
            console.log(this.props.dataSearch);
            await this.props.navigation.push('ResultSearch', { valueText: this.state.textValue });
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
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
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

    loadingProduct = (isLoading) => {
        if (isLoading) {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" animating={isLoading} color='#fff' />
                </View>);
        }
        else {
            return (
                <View style={styles.container}>
                    <View>
                        {this.flatlistProduct(this.state)}
                    </View>
                </View>
            );
        }
    }

    render() {
        const { idlv1, title } = this.props.navigation.state.params;
        const { isLoading } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'rgb(22, 25, 29)', height: 82, paddingTop: STATUSBAR_HEIGHT, flexDirection: 'row', borderBottomColor: 'rgb(51, 58, 68)', borderBottomWidth: 2, }}>
                    <TouchableOpacity style={{ width: 30, height: 40, marginLeft: 10 }}
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Ionicons color='#fff' name='ios-arrow-back' size={30} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 40, paddingLeft: 80 }}>
                        <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
                    </View>
                </View>
                {this.loadingProduct(isLoading)}
            </View>
        );
    }
}

ProductCategoriesScreen.navigationOptions = {
    header: null,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //left: 115,

        backgroundColor: 'rgb(22, 25, 29)'
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
        height: '100%',
    },
    lastPage: {
        alignItems: 'center',
        paddingBottom: 10,
    }
})
