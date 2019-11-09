import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import CardFlashSale from '../components/CardFlashSale';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesNominated(props) {
    const { data } = props;
    return (
        <View style={styles.NoCategoriesContainer}>
            <View style={styles.headerCategories}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Danh mục đề cử</Text>
                <TouchableOpacity style={{ marginRight: 10, marginTop: 5 }} onPress={() => { console.log("Press button categories"); }}>
                    <Ionicons color='#fff' name="ios-keypad" size={25} />
                </TouchableOpacity>
            </View>
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
        height: 150,
        marginBottom: 20,
    },
    headerCategories: {
        height: 30,
        marginLeft: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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