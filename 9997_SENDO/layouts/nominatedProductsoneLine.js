import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import CardProducts from '../components/CardProducts';

export default class ProductsOneLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            isLoading: true,
        };
    }

    componentDidMount = async () => {

        console.log(this.props.idProduct);
        const response = await fetch('http://amnhac.pro/public/recommend-item', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: this.props.idProduct
            }),
        });
        const data = await response.json();
        console.log(data);
        var dataProductRelateds = [];
        await Promise.all(data.map(async (item) => {
            let searchText = await (item.name + "").replace(' ', '%20');
            let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
            let jsonSearch = await responseSearch.json();
            let productsData = await jsonSearch.data;
            dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
            //}
        }));

        console.log(dataProductRelateds);
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

    render() {
        const { dataProduct, isLoading } = this.state;
        const { push } = this.props;

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
                                    onGoToProduct={push} />
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
