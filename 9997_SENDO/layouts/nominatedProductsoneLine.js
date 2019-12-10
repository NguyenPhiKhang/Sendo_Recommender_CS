import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import CardProducts from '../components/CardProducts';

export default class ProductsOneLine extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            isLoading: true,
        };
    }

    componentDidMount = async () => {
        this._isMounted = true;
        var idUser = '';
        //console.log(this.props.idProduct);
        if (this.props.dataLogin === 0)
            idUser = '';
        else idUser = this.props.dataLogin.id;
        console.log(idUser);
        const response = await fetch('http://amnhac.pro/public/recommend-item', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: idUser,
                product_id: 2791199
            }),
        });
        const data = await response.json();
        //console.log(data);
        var dataProductRelateds = [];
        if(data.length>10)
            data.length=10;
        await Promise.all(data.map(async (item) => {
            let searchText = await (item.name + "").replace(' ', '%20');
            let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
            let jsonSearch = await responseSearch.json();
            let productsData = await jsonSearch.data;
            if (typeof productsData === 'undefined')
                console.log("fail product Data nominated oneline");
            else {
                //console.log(productsData);
                dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
            }
            //}
        }));
        if (this._isMounted)
            this.setState({ dataProduct: dataProductRelateds, isLoading: false });
    }

    componentWillUnmount() {
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

    render() {
        const { dataProduct, isLoading } = this.state;
        const { push, dispatch, dataSeen, } = this.props;

        if (!isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#20242a' }}>
                    <ScrollView
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            {dataProduct.map(item => {
                                return <CardProducts item={item} key={item.id}
                                    onGoToProduct={push} dispatch={dispatch} dataSeen={dataSeen} />
                            })}
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#20242a' }}>
                    <ActivityIndicator size="large" animating={this.state.isLoading} color='#fff' />
                </View>);
        }
    }
}
