import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Platform } from 'react-native';
import {ConvertCurrency, renderStars} from '../constants/FunctionDefine';

export default function CardProducts(props) {
    const { item: { img_url, percent_star, final_price, promotion_percent, name }, onGoToProduct } = props;
    // let minPrice = (special_price==0)?price: special_price;
    // let maxPrice = price;
    // let disPercent = 0;

    const DrawDiscountPercent = () => {
        // disPercent = minPrice / maxPrice;
        //console.log(minPrice);
        if (promotion_percent > 0) {
            return (
                <ImageBackground style={{ width: 32, height: 17, alignItems: 'center', justifyContent: 'center' }}
                    source={require("../assets/images/intersect.png")}>
                    <Text style={{ color: '#fff', fontSize: 10 }}>{promotion_percent}%</Text>
                </ImageBackground>
            );
        }
        else { }
    }

    const onPressProduct = () => {
        //onGoToProduct('DetailsProduct', { ...props.item, minPrice ,disPercent});
        onGoToProduct('DetailsProduct', { ...props.item});
    }

    return (
        <TouchableOpacity style={styles.flashSaleContainer} onPress={onPressProduct}>
            <ImageBackground style={styles.Background} source={{ uri: img_url }}
                imageStyle={{
                    borderRadius: 17,
                }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(0,0,0, .25)',
                    height: 100, width: 100,
                    borderRadius: 17,
                }}>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                        {DrawDiscountPercent()}
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        {renderStars(percent_star ,10,'red')}
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.VName}>
                <Text style={{ color: "#fff", fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>{name}</Text>
            </View>
            <View style={styles.Vprice}>
            <Text style={{ color: "#fff", fontSize: 13, fontWeight: 'bold' }}>{ConvertCurrency(final_price + "")}đ</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        height: 185,
        backgroundColor: 'rgb(41,46,54)',
        margin: 8,
        padding: 8,
        borderRadius: 16,
        //width: 116,
    },
    Background: {
        width: 100,
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Vprice: {
        width: 100,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    VName: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});