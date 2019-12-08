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

  checkHideShowAvatar = (dataUserFB) => {
    //console.log(dataUserFB);
    if (dataUserFB === 0) {
      return <Image source={require('../assets/images/user.png')} style={{ width: 150, height: 150, borderRadius: 75 }} />
    }
    else return <Image source={{ uri: dataUserFB.picture.data.url }} style={{ width: 150, height: 150, borderRadius: 75 }} />
  }
  checkHideShowLogin = (dataUserFB) => {
    if (dataUserFB === 0) {
      return (
        <View style={{ alignItems: 'center', paddingTop: 135, justifyContent:'center' }}>
          <TouchableOpacity style={styles.btnLogOI} onPress={() => { this.props.navigation.navigate('Login') }}>
            <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 20, fontWeight: 'bold' }}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogOI}>
            <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 20, fontWeight: 'bold' }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={{ alignItems: 'center', paddingTop: 135, justifyContent:'center' }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{dataUserFB.name}</Text>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{dataUserFB.email}</Text>
          <TouchableOpacity style={styles.btnLogOI} onPress={() => { this.props.dispatch({type:'success', data: 0})}}>
            <Text style={{ color: 'rgb(26, 188, 254)', fontSize: 20, fontWeight: 'bold' }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }

  render() {
    const { dataUserFB } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'rgb(41, 46, 54)', height: 120, paddingTop: STATUSBAR_HEIGHT + 10, alignItems: 'center' }}>
          <Text style={{ color: 'rgb(255,255,255)', fontSize: 25, fontWeight: 'bold' }}>Account</Text>
        </View>
        <View style={styles.User}>
          <View style={{
            height: '100%', width: '100%', backgroundColor: 'transparent',
            justifyContent: 'center', alignItems:'center', paddingVertical: 10
          }}>
            {
              this.checkHideShowAvatar(dataUserFB)
            }
          </View>
        </View>
        {this.checkHideShowLogin(dataUserFB)}
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
  User: {
    height: 150,
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    position: 'absolute',
    top: 100,
    left: 0,
  },
  btnLogOI: {
    backgroundColor: 'rgb(41,46,54)',
    width: 110, height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  }
})