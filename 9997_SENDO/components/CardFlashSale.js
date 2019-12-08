import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Platform } from 'react-native';
import { ConvertCurrency } from '../constants/FunctionDefine';
import ProgressBar from 'react-native-simple-progress-bar';

export default function CardFlashSale(props) {
    const { imgBackground, imgDiscount, disPercent, Price, id } = props;
    return (
        <View style={styles.flashSaleContainer} key={id}>
            <ImageBackground style={styles.Background} source={imgBackground}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <ImageBackground style={{ width: 32, height: 17, alignItems: 'center', justifyContent: 'center' }}
                        source={imgDiscount}>
                        <Text style={{ color: '#fff', fontSize: 10 }}>{disPercent}%</Text>
                    </ImageBackground>
                </View>
                <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#f2c94c', fontSize: 12, alignSelf: 'flex-end', marginRight: 10 }}>Đã bán 10</Text>
                        <ProgressBar
                            fillStyle={{ backgroundColor: '#f2c94c', height: 3 }}
                            style={{ width: 80, borderRadius: 10, height: 3, backgroundColor: 'silver', marginBottom: 8, marginTop: 3 }}
                            progress={0.5}
                        />
                    </View>
            </ImageBackground>
            <View style={styles.Vprice}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: 'bold' }}>{ConvertCurrency(Price + '')}đ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        height: 130,
        backgroundColor: '#20242a',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    Background: {
        width: 100,
        height: 100,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    Vprice: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});