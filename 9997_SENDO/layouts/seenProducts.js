import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {filterForUniqueProducts} from '../constants/FunctionDefine';

export default function SeenProducts(props) {
    const { data, onGoToProduct, dispatch, dataSeen } = props;
    
    const onPressProduct=async (item)=>{
        let a = item;
        let b = [].concat(a);
        let data = await filterForUniqueProducts(b.concat(dataSeen));
        dispatch({type: 'productSeenSuccess', data: data});
        onGoToProduct('DetailsProduct', { ...item});
    }

    return (
        <View style={styles.SeenProductContainer}>
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
                        data.map((item) => {
                            return (
                                <TouchableOpacity key={item.id} style={{width: 120, height: 120,}} onPress={()=>{onPressProduct(item)}}>
                                    <Image source={{ uri: item.img_url }}
                                        style={{ width: 100, height: 100, borderRadius: 16, margin: 10 }} />
                                </TouchableOpacity>)
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