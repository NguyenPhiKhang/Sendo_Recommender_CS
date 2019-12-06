import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, Dimensions, TouchableOpacity, Image } from 'react-native';
const { StatusBarManager } = NativeModules;
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'rgb(41, 46, 54)', height: 120, paddingTop: STATUSBAR_HEIGHT + 10, alignItems: 'center' }}>
          <Text style={{ color: 'rgb(255,255,255)', fontSize: 25, fontWeight: 'bold' }}>Account</Text>
        </View>
        <View style={styles.rewardUser}>
          <View style={{
            borderRadius: 75, height: '100%', width: '100%', backgroundColor: 'rgb(41, 46, 54)',
            justifyContent: 'space-around', paddingVertical: 10
          }}>
            <Image source={require('../assets/images/user.png')} style={{ width: 150, height: 150 }} />
          </View>
        </View>
        <View style={{  alignItems:'center', paddingLeft: 40 }}>
          <TouchableOpacity style={styles.btnLogOI} onPress={()=>{this.props.navigation.navigate('Login')}}>
            <Text style={{ color: 'rgb(236, 81, 90)', fontSize: 20, fontWeight: 'bold' }}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogOI}>
            <Text style={{ color: 'rgb(236, 81, 90)', fontSize: 20, fontWeight: 'bold' }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

AccountScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rewardUser: {
    height: 150,
    width: 160,
    alignItems: "center",
    backgroundColor: 'transparent',
    paddingLeft: 10,
    position: 'absolute',
    top: 80,
    left: 0,
  },
  btnLogOI: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    width: 110, height: 30,
    borderRadius: 5,
    alignItems:'center',
    justifyContent: 'center',
    marginVertical: 5,
  }
})