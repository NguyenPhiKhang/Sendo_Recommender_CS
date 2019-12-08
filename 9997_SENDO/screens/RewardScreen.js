import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, Dimensions, TouchableOpacity, Image } from 'react-native';
const { StatusBarManager } = NativeModules;
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { CardChangeMoney, CardChangeGift } from '../components/CardReward';
import { ScrollView } from 'react-native-gesture-handler';


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

const FirstRoute = () => {
    return (
        <View style={styles.viewGift}>
            <ScrollView showsVerticalScrollIndicator={false}
                bounces={false}>
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
                <CardChangeMoney />
            </ScrollView>
        </View>
    )
}
const SecondRoute = () => {
    return (
        <View style={styles.viewGift}>
            <ScrollView showsVerticalScrollIndicator={false}
                bounces={false}>
                <View style={styles.viewVoucher}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        paddingHorizontal: 15, paddingTop: 17, paddingBottom: 8
                    }}>
                        <Text style={{ color: '#ec515a', fontSize: 20, fontWeight: 'bold' }}>Vouchers</Text>
                        <TouchableOpacity onPress={() => console.log("Vouchers...")}>
                            <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/images/voucher411.png')}
                        style={{ height: 130, width: "100%", borderRadius: 16 }} resizeMode='stretch' />
                </View>
                <View style={[styles.viewVoucher, { height: 260 }]}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        paddingHorizontal: 15, paddingTop: 17, paddingBottom: 8
                    }}>
                        <Text style={{ color: '#ec515a', fontSize: 20, fontWeight: 'bold' }}>Reward Mall</Text>
                        <TouchableOpacity onPress={() => console.log("Reward Mall...")}>
                            <Ionicons color='rgb(199, 199, 204)' name='ios-arrow-forward' size={23} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'row',
                        }}
                    >
                        <CardChangeGift />
                        <CardChangeGift />
                        <CardChangeGift />
                        <CardChangeGift />
                        <CardChangeGift />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

export default class RewardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Chợ điểm sen' },
                { key: 'second', title: 'Đổi quà' },
            ],
        };
    }
    _renderTabBar = props => {
        return (
            <View style={styles.tabBar}>
                {
                    props.navigationState.routes.map((route, i) => {
                        const color = (props.navigationState.index === i) ? 'rgb(242, 201, 76)' : 'rgba(255, 255, 255, 0.6)';
                        const bgIndicator = (props.navigationState.index === i) ? 'rgb(242, 201, 76)' : 'rgba(255, 255, 255, 0.4)';

                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.tabItem}
                                onPress={() => this.setState({ index: i })}>
                                <Animated.Text style={{ color, fontSize: 20, fontWeight: '400' }}>{route.title}</Animated.Text>
                                <View style={{ height: 1, width: '100%', backgroundColor: bgIndicator }}></View>
                            </TouchableOpacity>
                        );
                    })}
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'rgb(22, 25, 29)', height: 175, paddingTop: STATUSBAR_HEIGHT + 10, alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(242, 201, 76)', fontSize: 25, fontWeight: 'bold' }}>Reward Market</Text>
                </View>
                <View style={styles.rewardUser}>
                    <View style={{
                        borderRadius: 16, height: '100%', width: '100%', backgroundColor: 'rgb(41, 46, 54)',
                        justifyContent: 'space-around', paddingVertical: 10
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ color: 'rgb(242, 201, 76)', fontSize: 32, fontWeight: 'bold' }}>2900</Text>
                            <MaterialCommunityIcons color="rgb(242, 201, 76)" name='ticket' size={20}
                                style={{ padding: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    borderWidth: 1, borderRadius: 10, borderColor: 'rgb(26, 188, 254)',
                                    justifyContent: 'center', alignItems: 'center', width: 40, height: 40
                                }}>
                                    <Zocial color='rgb(26, 188, 254)' size={28} name='paypal' />
                                </View>
                                <View style={{ justifyContent: 'flex-end', marginLeft: 7, paddingBottom: 3 }}>
                                    <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 18 }}>130.000 vnd</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{marginRight: 5, marginBottom: 3}}>
                                    <Image source={require('../assets/images/withdraw.png')}
                                        style={{ height: 20, width: 20, borderRadius: 2 }} resizeMode='stretch' />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginBottom: 3}}>
                                    <Image source={require('../assets/images/topup.png')}
                                        style={{ height: 20, width: 20, borderRadius: 2 }} resizeMode='stretch' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width, backgroundColor: "#20242a", }}
                    style={styles.tabView}
                    renderTabBar={this._renderTabBar}
                />
            </View>
        );
    }
}

RewardScreen.navigationOptions = {
    header: null,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rewardUser: {
        height: 115,
        width: '100%',
        alignItems: "center",
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 100,
        left: 0,
    },
    scene: {
        flex: 1,
    },
    tabView: {
        marginTop: 50,
        marginHorizontal: 20,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingTop: 8,
    },
    viewGift: {
        flex: 1,
    },
    viewVoucher: {
        backgroundColor: "rgb(41, 46, 54)",
        height: 180,
        marginTop: 20,
        borderRadius: 16
    }
})