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
            <View style={{width: 50, justifyContent:'center', alignItems: 'center'}}>
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
            isLoading: false,
        }
    }

    componentDidMount = () => {
        this.setState({ dataProduct: this.props.datas })
        console.log(this.state.dataProduct);
    }

    componentDidUpdate = (prevProps, prevState) => {
        // if (prevState.dataProduct == [])
        //     this.setState({ dataProduct: this.props.datas })
        //onsole.log(this.state.dataProduct);
    }

    render() {
        const { datas, navigate } = this.props;
        const { dataProduct, isLoading, numberPage} = this.state;
        //console.log(dataProduct);
        if (dataProduct.length > 0) {
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
                            onScroll={async ({ nativeEvent }) => {
                                // if(isCloseToTop(nativeEvent)){
                                //     //do something
                                // }
                                if (await isCloseToBottom(nativeEvent)) {
                                    if (this.state.numberPage === 1||this.state.numberPage === 2) {
                                        const newPage = numberPage + 1;
                                        this.setState({ isLoading: true });
                                        const newResponse = await fetch(`http://amnhac.pro/public/index?page=${newPage}`);
                                        const jsonData = await newResponse.json();
                                        const newData = dataProduct.concat(jsonData);
                                        this.setState({ numberPage: newPage, dataProduct: newData, isLoading: false });
                                    }
                                }
                            }}
                            scrollEventThrottle={16}>
                            <View style={{ flexDirection: 'column', backgroundColor: '#20242a', justifyContent:'center', alignItems:'center'}}>
                                <View style={{ flexDirection: 'row' }}>
                                    {dataProduct.slice(0, Math.ceil(dataProduct.length / 2)).map((item, idx) => {
                                        return <CardProducts item={item.data.result.data} key={item.id}
                                            onGoToProduct={navigate} />
                                    })}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {dataProduct.slice(Math.ceil(dataProduct.length / 2)).map((item, idx) => {
                                        return <CardProducts item={item.data.result.data} key={item.id}
                                            onGoToProduct={navigate} />
                                    })}
                                </View>
                            </View>
                            {isLoadingAddPage(isLoading)}
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