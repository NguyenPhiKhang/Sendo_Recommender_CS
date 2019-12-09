import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, TouchableOpacity, Dimensions, Animated, ImageBackground } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Ionicons } from '@expo/vector-icons';
import { TabViewVertical, TabBarVertical } from 'react-native-vertical-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';



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
            justifyContent:'space-between',
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

const ThoiTrangNuScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Thời trang nữ</Text>
  </View>
);
const ThoiTrangNamScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Thời trang nam</Text>
  </View>
);
const SucKhoeLamDepScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Sức khoẻ và làm đẹp</Text>
  </View>
);
const GiayDepScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Giày dép</Text>
  </View>);
const TuiXachScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Túi xách</Text>
  </View>
);
const DongHoScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Đồng hồ</Text>
  </View>
);
const TrangSucScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Trang Sức</Text>
  </View>
);
const MeBeScreen = () => (
  <View style={styles.scene}>
    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Mẹ và Bé</Text>
  </View>
);


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
    ThoiTrangNu: ThoiTrangNuScreen,
    ThoiTrangNam: ThoiTrangNamScreen,
    SucKhoeLamDep: SucKhoeLamDepScreen,
    GiayDep: GiayDepScreen,
    TuiXach: TuiXachScreen,
    DongHo: DongHoScreen,
    TrangSuc: TrangSucScreen,
    MeBe: MeBeScreen,
  });

  render() {
    //console.log(this.props.dataCategories);
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'rgb(22, 25, 29)', height: 120, paddingTop: STATUSBAR_HEIGHT + 30, flexDirection: 'row' }}>
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
          swipeEnabled={false}
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
  backgroundImg:{ 
    width: 100, 
    height: 100, 
    borderRadius: 16 ,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
    marginBottom: 20,
}
});