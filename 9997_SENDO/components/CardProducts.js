import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from '@unimodules/core';

function eArabic(x){
    if(Platform.OS === 'android') { // only android needs polyfill
        require('intl'); // import intl object
        require('intl/locale-data/jsonp/it-IT'); // load the required locale details
      }
    return x.toLocaleString('it-IT');
  }

export default function CardFlashSale(props) {
    const { item:{srcBackground, srcDiscountBG, disPercent, price, id, stars, NameProduct}, onGoToProduct } = props;

    const renderStars = () => {
        const fields = [];
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                fields.push(
                    <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color='rgb(242, 201, 76)' size={10} />
                );
            }
            else {
                fields.push(
                    <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color='silver' size={10} />
                );
            }
        }
        return fields;
    };

    const DrawDiscountPercent = () => {
        if (disPercent > 0) {
            return (
                <ImageBackground style={{ width: 32, height: 17, alignItems: 'center', justifyContent: 'center' }}
                    source={srcDiscountBG}>
                    <Text style={{ color: '#fff', fontSize: 10 }}>{disPercent}%</Text>
                </ImageBackground>
            );
        }
    }

    const onPressProduct=()=>{
        onGoToProduct('DetailsProduct', {...props.item});
    }

    return (
        <TouchableOpacity style={styles.flashSaleContainer} key={id} onPress={onPressProduct}>
            <ImageBackground style={styles.Background} source={srcBackground[0].source}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: 100, width: 100 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                        {DrawDiscountPercent()}
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        {renderStars()}
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.VName}>
                <Text style={{ color: "#fff", fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>{NameProduct}</Text>
            </View>
            <View style={styles.Vprice}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: 'bold' }}>{eArabic(price)} đ</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        height: 185,
        backgroundColor: 'rgb(41,46,54)',
        margin: 10,
        padding: 8,
        borderRadius: 16,
    },
    Background: {
        width: 100,
        height: 100,
        borderRadius: 16,
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
    VName:{
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});