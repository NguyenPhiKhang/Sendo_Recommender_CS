import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CardProducts from '../components/CardProducts';

export default function ProductsNominated(props) {
    const { datas, navigate } = props;
    if (datas.length > 0) {
        return (
            <View style={styles.flashSaleContainer}>
                <View style={{ width: "100%", height: 500 }}>
                    <ScrollView
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            backgroundColor: '#20242a',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            {datas.slice(0, Math.ceil(datas.length / 2)).map(item => {
                                return <CardProducts item={item.data.result.data} key={item.id}
                                    onGoToProduct={navigate} />
                            })}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {datas.slice(Math.ceil(datas.length / 2)).map(item => {
                                return <CardProducts item={item.data.result.data} key={item.id}
                                    onGoToProduct={navigate} />
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
    else{
        return(
            <View style={{flex:1, height: 450, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color='white' size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flashSaleContainer: {
        flex: 1,
        height: 450,
    }
})