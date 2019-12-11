import React from 'react';
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native';
import CardFlashSale from '../components/CardFlashSale';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { renderStars, change_alias } from '../constants/FunctionDefine';

export default class CategoriesNominated extends React.Component {
    _isMount = false;
    constructor(props) {
        super(props)

        this.state = {
            datacates: [],
            isLoading: true,
        };
    };

    async componentDidMount() {
        this._isMount = true;
        if (this.props.data !== 0) {
            const response = await fetch('http://amnhac.pro/public/recommend-category', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.props.data.id,
                }),
            });
            jsonData = await response.json();
            if (this._isMount)
                this.setState({ datacates: jsonData, isLoading: false });
        }
    }
    
    Press=(name, push)=>{
        const a = change_alias(name);
        push('ProductCategory', { idlv1: a, title: name, kind: 1, lv2: '', lv3: '' });
      }

    componentDidUpdate = async (prevProps, prevState) => {
        this._isMount = true;
        if (this.props.data !== 0) {
            const response = await fetch('http://amnhac.pro/public/recommend-category', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.props.data.id,
                }),
            });
            jsonData = await response.json();
            if (this._isMount)
                this.setState({ datacates: jsonData, isLoading: false });
        }

    }

    componentWillUnmount() {
        this._isMount = false;
    }


    render() {
        const { data, push } = this.props;
        const { isLoading, datacates } = this.state;
        if (data !== 0) {
            if (!isLoading) {
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
                                    datacates.map((item) => {
                                        return (
                                            <TouchableOpacity key={item.id} onPress={() => { this.Press(item.name, push) }}>
                                                <ImageBackground source={require('./../assets/images/category/default.png')} style={styles.backgroundImg}>
                                                    <Text style={{ color: 'rgb(26,188,254)', fontSize: 13, paddingRight: 5 }}
                                                    >{item.name}</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={{ flex: 1, backgroundColor: 'rgb(32, 36, 42)', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" animating={isLoading} color='#fff' />
                    </View>);
            }
        }
        else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    NoCategoriesContainer: {
        flex: 1,
        height: 120,
        marginBottom: 20,
    },
    backgroundImg: {
        width: 100,
        height: 100,
        borderRadius: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 10,
    }
})