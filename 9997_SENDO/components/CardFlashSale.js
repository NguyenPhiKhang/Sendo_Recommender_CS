import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

export default function CardFlashSale(props) {
    const { imgBackground, imgDiscount, disPercent, Price, id } = props;

    //const formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });

    return (
        <View style={styles.flashSaleContainer} key={id}>
            <ImageBackground style={styles.Background} source={imgBackground}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <ImageBackground style={{ width: 32, height: 17, alignItems: 'center', justifyContent: 'center' }}
                        source={imgDiscount}>
                        <Text style={{ color: '#fff', fontSize: 10 }}>{disPercent}%</Text>
                    </ImageBackground>
                </View>
            </ImageBackground>
            <View style={styles.Vprice}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: 'bold' }}>{Price}đ</Text>
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