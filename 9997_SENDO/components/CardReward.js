import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBar from 'react-native-simple-progress-bar';

const CardChangeMoney = props => {
    return (
        <View style={styles.CardMoneycontainer}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ color: 'rgb(242, 201, 76)', fontSize: 30, fontWeight: 'bold' }}>200</Text>
                <MaterialCommunityIcons color="rgb(242, 201, 76)" name='ticket' size={18}
                    style={{ padding: 5 }} />
            </View>
            <Text style={{ color: 'rgb(255, 109, 214)', fontSize: 20 }}>20.000 vnd</Text>
        </View>
    );
}

const CardChangeGift = props => {
    return (
        <TouchableOpacity style={styles.flashSaleContainer} onPress={() => { console.log("Change Gift") }}>
            <ImageBackground style={styles.Background} source={require('../assets/images/camera.png')}
                imageStyle={{
                    borderRadius: 17,
                }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0, .25)',
                    height: 100, width: 100,
                    borderRadius: 17,
                }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#f2c94c', fontSize: 12, alignSelf: 'flex-end', marginRight: 10 }}>Còn 1</Text>
                        <ProgressBar
                            fillStyle={{ backgroundColor: '#f2c94c', height: 3 }}
                            style={{ width: 80, borderRadius: 10, height: 3, backgroundColor: 'silver', marginBottom: 8, marginTop: 3 }}
                            progress={0.5}
                        />
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ color: 'rgb(242, 201, 76)', fontSize: 18, fontWeight: 'bold', }}>22.300</Text>
                <MaterialCommunityIcons color="rgb(242, 201, 76)" name='ticket' size={15} style={{ padding: 1 }} />
            </View>
            <View style={{marginTop: 25, alignItems: 'center'}}>
                <Text style={{ color: '#ec515a', fontSize: 12, alignSelf: 'flex-end', marginRight: 10 }}>Còn 13:08:00</Text>
                <ProgressBar
                    fillStyle={{ backgroundColor: '#ec515a', height: 3 }}
                    style={{ width: 80, borderRadius: 10, height: 3, backgroundColor: 'silver', marginBottom: 8, marginTop: 3 }}
                    progress={0.8}
                />
            </View>
        </TouchableOpacity>
    );
}

export { CardChangeGift, CardChangeMoney }

const styles = StyleSheet.create({
    CardMoneycontainer: {
        //flex: 1,
        backgroundColor: "rgb(41, 46, 54)",
        borderRadius: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10
    },
    flashSaleContainer: {
        height: 185,
        backgroundColor: 'rgb(51, 58, 68)',
        margin: 10,
        padding: 8,
        borderRadius: 16,
        alignSelf: 'baseline'
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
})