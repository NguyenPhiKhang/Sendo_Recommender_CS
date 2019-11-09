import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function SeenProducts(props) {
    const { data } = props;
    return (
        <View style={styles.SeenProductContainer}>
            <View style={{ width: '100%', height: 20, marginLeft: 10, marginVertical: 5}}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sản phẩm vừa xem</Text>
            </View>
            <View style={{ width: "100%", height: 120 }}>
                <ScrollView
                    horizontal={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        backgroundColor: '#20242a',
                    }}>
                        {
                            data.map((item)=>{
                                return <Image key={item.id} source={item.source} 
                                style={{width: 100, height: 100, borderRadius: 16, margin: 10}}/>
                            })
                        }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    SeenProductContainer: {
        flex: 1,
        marginBottom: 20,
    }
})