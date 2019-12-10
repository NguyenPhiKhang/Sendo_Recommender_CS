import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, NativeModules, Dimensions, Platform, ScrollView } from 'react-native';
import CardProducts from '../components/CardProducts';
const { StatusBarManager } = NativeModules;


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;
const DEVICE_WIDTH = Dimensions.get("window").width;

const isCloseToBottom = async ({ layoutMeasurement, contentOffset, contentSize }) => {
    console.log('end');
    return await layoutMeasurement.width + contentOffset.x > contentSize.width - 60;
}



const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
}

const isLoadingAddPage = (isloading) => {
    if (isloading) {
        return (
            <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#fff' />
            </View>
        )
    }
}

export default class ProductsNominated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberPage: 1,
            dataProduct: [],
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        const data = await this.props.datas;
        var dataProductRelateds = [];
        console.log(data.length);
        await Promise.all(data.map(async (item) => {
            let searchText = await (item.name + "").replace(' ', '%20');
            let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
            let jsonSearch = await responseSearch.json();
            let productsData = await jsonSearch.data;
            if (typeof productsData === 'undefined')
                console.log("fail product Data nominated product");
            else
                dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
        }));
        this.setState({ dataProduct: dataProductRelateds, isLoading: false });
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

    compareProducts = async (arrPrev, arrNew) => {
        if(arrPrev.length!=arrNew.length)
            return false;
        else{
            for(var i=0;i<arrPrev.length;i++) 
            {
                const isEqual = JSON.stringify(arrPrev[i]) === JSON.stringify(arrNew[i]);
                if(!isEqual) return false;
            }
        }
        return true;
      };

    componentDidUpdate = async (prevProps, prevState) => {
        console.log("---did update");
        let isSame = await this.compareProducts(prevProps.datas, this.props.datas);
        //this.setState({isLoading: true});
        if (!isSame) {
            this.setState({isLoading: true});
            console.log('---have change');
            const data = await this.props.datas;
            var dataProductRelateds = [];
            console.log(data.length);
            await Promise.all(data.map(async (item) => {
                let searchText = await (item.name + "").replace(' ', '%20');
                let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
                let jsonSearch = await responseSearch.json();
                let productsData = await jsonSearch.data;
                if (typeof productsData === 'undefined')
                    console.log("fail product Data nominated product");
                else
                    dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
            }));
            this.setState({ dataProduct: dataProductRelateds, isLoading: false });
        }
    }

    render() {
        const { datas, navigate, dispatch, dataSeen } = this.props;
        const { dataProduct, isLoading, numberPage } = this.state;
        if (!isLoading) {
            return (
                <View style={styles.flashSaleContainer}>
                    <View style={{ width: "100%", height: 400 }}>
                        <ScrollView
                            horizontal={true}
                            bounces={false}
                            //pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: 'row',
                                backgroundColor: '#20242a',
                            }}
                        // onScroll={async ({ nativeEvent }) => {
                        //     // if(isCloseToTop(nativeEvent)){
                        //     //     //do something
                        //     // }
                        //     if (await isCloseToBottom(nativeEvent)) {
                        //         if (this.state.numberPage === 1||this.state.numberPage === 2) {
                        //             const newPage = numberPage + 1;
                        //             this.setState({ isLoading: true });
                        //             const newResponse = await fetch(`http://amnhac.pro/public/index`);
                        //             const jsonData = await newResponse.json();
                        //             const newData = dataProduct.concat(jsonData);
                        //             this.setState({ numberPage: newPage, dataProduct: newData, isLoading: false });
                        //         }
                        //     }
                        // }}
                        //scrollEventThrottle={16}
                        >
                            <View style={{ flexDirection: 'column', backgroundColor: '#20242a', justifyContent: 'center', paddingLeft: 5 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    {dataProduct.slice(0, Math.ceil(dataProduct.length / 2)).map((item, idx) => {
                                        return <CardProducts item={item} key={item.id}
                                            onGoToProduct={navigate} dispatch={dispatch} dataSeen={dataSeen} />
                                    })}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {dataProduct.slice(Math.ceil(dataProduct.length / 2)).map((item, idx) => {
                                        return <CardProducts item={item} key={item.id}
                                            onGoToProduct={navigate} dispatch={dispatch} dataSeen={dataSeen} />
                                    })}
                                </View>
                            </View>
                            {/* {isLoadingAddPage(isLoading)} */}
                        </ScrollView>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, height: 450, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='white' size="large" />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        flex: 1,
        height: 400,
    }
})