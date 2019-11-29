import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CardProducts from '../components/CardProducts';

export default function ProductsNominated(props) {
    const { data, navigate } = props;
    return (
        <View style={styles.flashSaleContainer}>
            <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5}}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm đề cử</Text>
            </View>
            <View style={{ width: "100%", height: 500 }}>
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
                            return <CardProducts item={item} key={item.id}
                            onGoToProduct={navigate}/>
                        })}
                    </View>
                    <View style={{flexDirection:'row'}}>
                        {data.slice(Math.ceil(data.length / 2)).map(item => {
                            return <CardProducts item={item} key={item.id}
                            onGoToProduct={navigate}/>
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
        height: 450,
    }
})