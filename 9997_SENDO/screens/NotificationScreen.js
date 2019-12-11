import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'rgb(22, 25, 29)', flex: .1, paddingTop: STATUSBAR_HEIGHT + 15, alignItems: 'center' }}>
          <Text style={{ color: 'orange', fontSize: 25, fontWeight: 'bold' }}>Notification</Text>
        </View>
        <View style={{width: '100%', alignItems:'center', justifyContent:'center', flex:.9}}>
          <Text style={{color:'rgba(255,255,255,0.6)', fontSize:20}}>Không có thông báo</Text>
        </View>
      </View>
    );
  }
}

NotificationScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
})