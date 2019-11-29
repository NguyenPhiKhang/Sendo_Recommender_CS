import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import CardFlashSale from '../components/CardFlashSale';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function FlashSale(props) {
    const { data } = props;
    return (
        <View style={styles.flashSaleContainer}>
            <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5}}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>FlashSale</Text>
            </View>
            <View style={{ width: "100%", height: 300 }}>
                <ScrollView
                    horizontal={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        backgroundColor: '#20242a',
                    }}>
                    <View style={{flexDirection:'row'}}>
                        {data.slice(0, Math.ceil(data.length / 2)).map(item => {
                            return <CardFlashSale key={item.id} imgBackground={item.srcBackground} imgDiscount={item.srcDiscountBG}
                            disPercent={item.disPercent} Price={item.price}/>
                        })}
                    </View>
                    <View style={{flexDirection:'row'}}>
                        {data.slice(Math.ceil(data.length / 2)).map(item => {
                            return <CardFlashSale key={item.id} imgBackground={item.srcBackground} imgDiscount={item.srcDiscountBG}
                            disPercent={item.disPercent} Price={item.price}/>
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        flex: 1,
        height: 330,
        marginBottom: 20,
    }
})