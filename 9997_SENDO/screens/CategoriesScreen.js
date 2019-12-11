import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, TouchableOpacity, Dimensions, Animated, ImageBackground, Image, ActivityIndicator } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Ionicons } from '@expo/vector-icons';
import { TabViewVertical, TabBarVertical } from 'react-native-vertical-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownItem from 'react-native-drop-down-item';
import danhmucJson from './../utils/danhmuc.json';
import { Button } from 'react-native-paper';
import {change_alias} from '../constants/FunctionDefine';

const IC_ARR_DOWN = require('./../assets/images/ic_arr_down.png');
const IC_ARR_UP = require('./../assets/images/ic_arr_up.png');


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

class DanhChoBanScreen extends React.Component {
  //const { data } = props;
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

  componentWillUnmount() {
    this._isMount = false;
  }


  render() {
    const { data, push } = this.props;
    const { isLoading, datacates } = this.state;
    if (data !== 0) {
      if (!isLoading) {
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
                datacates.map((item) => {
                  return (
                    <TouchableOpacity key={item.id} onPress={()=>{Press(item.name, push)}}>
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
        )
        //}
      }
      else {
        return (
          <View style={{ flex: 1, backgroundColor: 'rgb(32, 36, 42)', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" animating={isLoading} color='#fff' />
          </View>);
      }
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor: 'rgb(32, 36, 42)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: .9 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 20 }}>Không có đề cử</Text>
          </View>
        </View>
      )
    }
  }
}

const PressAll = (idlv1, push, title) => {
  // const response = await fetch(`https://mapi.sendo.vn/mob/product/cat/${idlv1}?p=1`)
  // const jsonData = await response.json();
  // console.log(jsonData);
  push('ProductCategory', { idlv1: idlv1, title: title, kind: 1, lv2: '', lv3: '' });
}

const goProductlv3 = async (idlv1, lv2, lv3, push) => {
  // const response = await fetch(`https://mapi.sendo.vn/mob/product/cat/${idlv1}/${lv2.id}/${lv3.id}?p=1`)
  // const jsonData = await response.json();
  // console.log(jsonData);
  push('ProductCategory', { idlv1: idlv1, title: lv3.name, kind: 3, lv2: lv2, lv3: lv3 });
}

const Press=(name, push)=>{
  const a = change_alias(name);
  push('ProductCategory', { idlv1: a, title: name, kind: 1, lv2: '', lv3: '' });
}

const NoRecommanderScreen = (props) => {
  const { idlv1, lv1, push, title } = props;
  return (
    <View style={styles.scene}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#20242a',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>

        {/* HELP: click chổ này thì em gọi api số 1 vs lv1: idlv1, https://mapi.sendo.vn/mob/product/cat/${idlv1}?p=1 */}
        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 8, }} onPress={() => { PressAll(idlv1, push, title) }}>
          <Ionicons color='#ff6dd6' name='ios-arrow-forward' size={18} />
          <Text style={{
            fontSize: 15,
            fontWeight: "600",
            fontStyle: "normal",
            color: "#ff6dd6",
            marginRight: 8,
            marginBottom: 8
          }}>Xem tất cả</Text>
        </TouchableOpacity>
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
                  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                      lv2.detail.length != 0
                        ? lv2.detail.map(lv3 => {
                          //console.log(lv2.id);
                          const defaultCategory = require('./../assets/images/category/default.png');
                          const imgSrc = lv3.img == '' ? defaultCategory : { uri: lv3.img };

                          {/* HELP: click chổ này thì em gọi api số 1 vs lv1: idlv1, lv2: lv2.id, lv3: lv3.id https://mapi.sendo.vn/mob/product/cat/${idlv1}/${lv2.id}/${lv3.id}?p=1 */ }
                          return (
                            <TouchableOpacity key={lv3.id} style={{ margin: 5, padding: 5, justifyContent: 'center', alignItems: 'center', width: 110 }} onPress={() => { goProductlv3(idlv1, lv2, lv3, push) }}>
                              <Image source={imgSrc} style={styles.imgCate} resizeMode='stretch' />
                              <Text style={{ color: 'rgba(255, 255, 255, 0.87)', fontWeight: '600', fontSize: 13, paddingRight: 5, textAlign: 'center', width: '100%' }}>{lv3.name}</Text>

                            </TouchableOpacity>
                          )
                        })
                        : null
                    }
                  </View>
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
  //flex:1,
  height: 600,
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

  // _renderScene = SceneMap({
  //   DanhChoBan: () => <DanhChoBanScreen data={this.props.dataCategories} />,
  //   ThoiTrangNu: () => <NoRecommanderScreen idlv1={'thoi-trang-nu'} lv1={danhmucJson['thoi-trang-nu']} />,
  //   ThoiTrangNam: () => <NoRecommanderScreen idlv1={'thoi-trang-nam'} lv1={danhmucJson['thoi-trang-nam']} />,
  //   SucKhoeLamDep: () => <NoRecommanderScreen idlv1={'suc-khoe-lam-dep'} lv1={danhmucJson['suc-khoe-lam-dep']} />,
  //   GiayDep: () => <NoRecommanderScreen idlv1={'day-dep'} lv1={danhmucJson['day-dep']} />,
  //   TuiXach: () => <NoRecommanderScreen idlv1={'tui-sach'} lv1={danhmucJson['tui-sach']} />,
  //   DongHo: () => <NoRecommanderScreen idlv1={'dong-ho'} lv1={danhmucJson['dong-ho']} />,
  //   TrangSuc: () => <NoRecommanderScreen idlv1={'trang-suc'} lv1={danhmucJson['trang-suc']} />,
  //   MeBe: () => <NoRecommanderScreen idlv1={'me-va-be'} lv1={danhmucJson['me-va-be']} />,
  // });

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'DanhChoBan':
        return <DanhChoBanScreen data={this.props.dataUserLogin} push={this.props.navigation.push}/>;
      case 'ThoiTrangNu':
        return <NoRecommanderScreen idlv1={'thoi-trang-nu'} lv1={danhmucJson['thoi-trang-nu']} push={this.props.navigation.push} title={route.title} />;
      case 'ThoiTrangNam':
        return <NoRecommanderScreen idlv1={'thoi-trang-nam'} lv1={danhmucJson['thoi-trang-nam']} push={this.props.navigation.push} title={route.title} />;
      case 'SucKhoeLamDep':
        return <NoRecommanderScreen idlv1={'suc-khoe-lam-dep'} lv1={danhmucJson['suc-khoe-lam-dep']} push={this.props.navigation.push} title={route.title} />;
      case 'GiayDep':
        return <NoRecommanderScreen idlv1={'day-dep'} lv1={danhmucJson['day-dep']} push={this.props.navigation.push} title={route.title} />;
      case 'TuiXach':
        return <NoRecommanderScreen idlv1={'tui-sach'} lv1={danhmucJson['tui-sach']} push={this.props.navigation.push} title={route.title} />;
      case 'DongHo':
        return <NoRecommanderScreen idlv1={'dong-ho'} lv1={danhmucJson['dong-ho']} push={this.props.navigation.push} title={route.title} />;
      case 'TrangSuc':
        return <NoRecommanderScreen idlv1={'trang-suc'} lv1={danhmucJson['trang-suc']} push={this.props.navigation.push} title={route.title} />;
      case 'MeBe':
        return <NoRecommanderScreen idlv1={'me-va-be'} lv1={danhmucJson['me-va-be']} push={this.props.navigation.push} title={route.title} />;
      default:
        return null;
    }
  };



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
        //scrollEnabled
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
    //left: 115,

    backgroundColor: '#EDECED'
  },
  scene: {
    flex: 1,
    //left: 115,
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
  },
  imgCate: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginBottom: 6,
  }
});