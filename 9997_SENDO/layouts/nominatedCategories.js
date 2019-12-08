import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import CardFlashSale from '../components/CardFlashSale';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesNominated(props) {
    const { data } = props;
    return (
        <View style={styles.NoCategoriesContainer}>
            <View style={{ height: 120 }}>
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
                                <ImageBackground key={item.id} source={item.sourceImg} style={styles.backgroundImg}>
                                    <Text style={{color:'rgb(26,188,254)', fontSize: 13, paddingRight: 5}}
                                    >{item.nameCategories}</Text>
                                </ImageBackground>
                            );
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NoCategoriesContainer: {
        flex: 1,
        height: 120,
        marginBottom: 20,
    },
    backgroundImg:{ 
        width: 100, 
        height: 100, 
        borderRadius: 16 ,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 10,
    }
})