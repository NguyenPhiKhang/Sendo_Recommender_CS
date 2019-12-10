import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import CardProducts from '../components/CardProducts';

export default class providerProducts extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dataProvider: [],
            isLoading: true,
        };
    }

    componentDidMount = async () => {
        this._isMounted = true;
        var dataProductRelateds = [];
        var data = this.props.data;
        await Promise.all(data.map(async (item) => {
            var response = await fetch(`https://mapi.sendo.vn/mob/product/${item}/detail/`);
            var jsonData = await response.json();

            if (typeof jsonData.length === 'undefined') {
                let searchText = await (jsonData.name + "").replace(' ', '%20');
                let responseSearch = await fetch(`https://mapi.sendo.vn/mob/product/search?p=1&q=${searchText}`);
                let jsonSearch = await responseSearch.json();
                let productsData = await jsonSearch.data;
                //console.log(productsData);
                if (typeof productsData ==='undefined') {
                    console.log("fail product Data provider");
                }
                else
                    dataProductRelateds = await this.filterForUniqueProducts(dataProductRelateds.concat(productsData[0]));
            }
        }));

        //console.log(dataProductRelateds);
        if(this._isMounted)
            this.setState({ dataProvider: dataProductRelateds, isLoading: false });
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

    render() {
        const { dataProvider, isLoading } = this.state;
        const { push, dispatch, dataSeen } = this.props;

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
                            {dataProvider.map(item => {
                                return <CardProducts item={item} key={item.id}
                                    onGoToProduct={push} dispatch={dispatch} dataSeen={dataSeen}/>
                            })}
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor: '#20242a' }}>
                    <ActivityIndicator size="large" animating={isLoading} color='#fff' />
                </View>);
        }
    }
}
