import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, TouchableOpacity, Dimensions, Animated, ImageBackground } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Ionicons } from '@expo/vector-icons';
import { TabViewVertical, TabBarVertical } from 'react-native-vertical-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownItem from 'react-native-drop-down-item';
import danhmucJson from './../utils/danhmuc.json';
import { Button } from 'react-native-paper';

const IC_ARR_DOWN = require('./../assets/images/ic_arr_down.png');
const IC_ARR_UP = require('./../assets/images/ic_arr_up.png');


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

const DanhChoBanScreen = (props) => {
  const { data } = props;
  if (data.length > 0) {
    return (
      <View style={styles.scene}>
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            backgroundColor: '#20242a',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginHorizontal: 20
          }}>
          {
            data.map((item) => {
              return (
                <ImageBackground key={item.id} source={item.sourceImg} style={styles.backgroundImg}>
                  <Text style={{ color: 'rgb(26,188,254)', fontSize: 13, paddingRight: 5 }}
                  >{item.nameCategories}</Text>
                </ImageBackground>
              );
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const NoRecommanderScreen = (props) => {
  const { idlv1, lv1 } = props;
  return (
    <View style={styles.scene}>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#20242a',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>

        {/* HELP: click chổ này thì em gọi api số 1 vs lv1: idlv1, https://mapi.sendo.vn/mob/product/cat/${idlv1}?p=1 */}
        <View style={{ flexDirection: 'row-reverse', marginTop: 8 }}>
          <Ionicons color='#ff6dd6' name='ios-arrow-forward' size={18} />
          <Text style={{
            fontSize: 15,
            fontWeight: "600",
            fontStyle: "normal",
            color: "#ff6dd6",
            marginRight: 8,
            marginBottom: 8
          }}>Xem tất cả</Text>
        </View>

        {
          lv1
            ? lv1.map(lv2 => {
              return (
                <DropDownItem
                  key={lv2.id}
                  style={{ marginBottom: 8 }}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={{
                      width: initialLayout.width * 0.6,
                      borderRadius: 4,
                      backgroundColor: 'rgb(51, 58, 68)'
                    }}>
                      <Button style={{
                        fontSize: 16,
                        flex: 1,
                        flexDirection: 'row',
                      }} color='rgba(255, 255, 255, 0.87)' uppercase={false}>{lv2.name}</Button>
                    </View>
                  }
                >
                  {
                    lv2.detail.length != 0
                      ? lv2.detail.map(lv3 => {
                        console.log(lv3.img);
                        const defaultCategory = require('./../assets/images/category/default.png');
                        const imgSrc = lv3.img == '' ? defaultCategory : {uri: lv3.img};

                        {/* HELP: click chổ này thì em gọi api số 1 vs lv1: idlv1, lv2: lv2.id, lv3: lv3.id https://mapi.sendo.vn/mob/product/cat/${idlv1}/${lv2.id}/${lv3.id}?p=1 */}
                        return (
                          <ImageBackground key={lv3.id} source={imgSrc} style={styles.backgroundImg}>
                            <Text style={{ color: 'rgb(26,188,254)', fontSize: 13, paddingRight: 5 }}>{lv3.name}</Text>
                          </ImageBackground>
                        )
                      })
                      : null
                  }

                </DropDownItem>
              );
            })
            : null
        }

      </ScrollView>
    </View>


  )
}

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'DanhChoBan', title: 'Dành cho bạn' },
        { key: 'ThoiTrangNu', title: 'Thời trang nữ' },
        { key: 'ThoiTrangNam', title: 'Thời trang nam' },
        { key: 'SucKhoeLamDep', title: 'Sức khoẻ và làm đẹp' },
        { key: 'GiayDep', title: 'Giày dép' },
        { key: 'TuiXach', title: 'Túi Xách' },
        { key: 'DongHo', title: 'Đồng hồ' },
        { key: 'TrangSuc', title: 'Trang Sức' },
        { key: 'MeBe', title: 'Mẹ và bé' },
      ],
    };
  }

  _handleIndexChange = (index) => {
    this.setState({ index });
  };

  _renderLabelFactory = (props) => {
    //({route }) => {
    const index = props.navigationState.index;
    const inputRange =
      props.navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map((inputIndex) =>
      (inputIndex === index ? '#ff4081' : '#ffdc'));
    const color = props.position.interpolate({
      inputRange,
      outputRange
    });
    return <Animated.Text style={[styles.label, { color }]}>{route.title}</Animated.Text>;
    //}
  };

  _renderIconFactory = (props) => (
    ({ route }) => {
      const index = props.navigationState.routes.indexOf(route);
      const inputRange =
        props.navigationState.routes.map((x, i) => i);
      const outputRange = inputRange.map((inputIndex) =>
        (inputIndex === index ? Colors.lightBlue : Colors.dhsWhite));
      const color = props.position.interpolate({
        inputRange,
        outputRange
      });
      const AnimatedIcon = Animated.createAnimatedComponent(Icon);
      return <AnimatedIcon name={route.icon} size={30} style={[styles.icon, { color }]} />;
    }
  );

  _renderTabBar = (props) => {
    return (
      <View style={{ flexDirection: 'column', backgroundColor: 'rgb(22, 25, 29)', alignContent: 'space-between' }}>
        {
          props.navigationState.routes.map((route, i) => {
            const color = (props.navigationState.index === i) ? 'rgb(26, 188, 254)' : 'rgba(255, 255, 255, 0.8)';
            const bgIndicator = (props.navigationState.index === i) ? 'rgb(26, 188, 254)' : 'rgb(22, 25, 29)';
            const backgroundColor = (props.navigationState.index === i) ? 'rgb(32, 36, 42)' : 'rgb(22, 25, 29)';

            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabItem, { backgroundColor }]}
                onPress={() => this.setState({ index: i })}>
                <View style={{ height: '100%', width: 5, backgroundColor: bgIndicator }}></View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', width: 115, marginLeft: 3 }}>
                  <Animated.Text style={{ color, fontSize: 16, fontWeight: '400', width: '100%' }}>{route.title}</Animated.Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };

  _renderScene = SceneMap({
    DanhChoBan: () => <DanhChoBanScreen data={this.props.dataCategories} />,
    ThoiTrangNu: () => <NoRecommanderScreen idlv1={'thoi-trang-nu'} lv1={danhmucJson['thoi-trang-nu']} />,
    ThoiTrangNam: () => <NoRecommanderScreen idlv1={'thoi-trang-nam'} lv1={danhmucJson['thoi-trang-nam']} />,
    SucKhoeLamDep: () => <NoRecommanderScreen idlv1={'suc-khoe-lam-dep'} lv1={danhmucJson['suc-khoe-lam-dep']} />,
    GiayDep: () => <NoRecommanderScreen idlv1={'day-dep'} lv1={danhmucJson['day-dep']} />,
    TuiXach: () => <NoRecommanderScreen idlv1={'tui-sach'} lv1={danhmucJson['tui-sach']} />,
    DongHo: () => <NoRecommanderScreen idlv1={'dong-ho'} lv1={danhmucJson['dong-ho']} />,
    TrangSuc: () => <NoRecommanderScreen idlv1={'trang-suc'} lv1={danhmucJson['trang-suc']} />,
    MeBe: () => <NoRecommanderScreen idlv1={'me-va-be'} lv1={danhmucJson['me-va-be']} />,
  });

  render() {
    //console.log(this.props.dataCategories);
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'rgb(22, 25, 29)', height: 82, paddingTop: STATUSBAR_HEIGHT, flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 30, height: 40, marginLeft: 10 }}
            onPress={() => { this.props.navigation.goBack(); }}>
            <Ionicons color='#fff' name='ios-arrow-back' size={30} />
          </TouchableOpacity>
          <View style={{ width: '100%', height: 40, paddingLeft: 80 }}>
            <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 25, fontWeight: 'bold' }}>All Categories</Text>
          </View>
        </View>
        <TabViewVertical
          initialLayout={initialLayout}
          renderTabBar={this._renderTabBar}
          style={{ backgroundColor: '#EDECED' }}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          swipeEnabled
          scrollEnabled
        />
      </View>
    );
  }
}

CategoriesScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDECED'
  },
  scene: {
    flex: 1,
    backgroundColor: 'rgb(32, 36, 42)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbar: {
    backgroundColor: '#205493'
  },
  tab: {
    width: 110,
    height: 80
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#ffffff'
  },
  indicator: {
    width: 110,
    height: 80,
    backgroundColor: '#F6F7F8'
  },
  label: {
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 5,
    color: '#F6F7F8',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'space-between',
    width: 120,
    flexDirection: 'row'
  },
  backgroundImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
    marginBottom: 20,
  }
});