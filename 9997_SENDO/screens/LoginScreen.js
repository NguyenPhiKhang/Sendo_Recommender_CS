import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, NativeModules, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import * as Facebook from 'expo-facebook';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    onPressLoginFb = async ()=>{
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('1002868356715145', {
                permissions: ['public_profile'],
            });
            console.log(type);
            console.log(token);
            //   if (type === 'success') {
            //     // Get the user's name using Facebook's Graph API
            //     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            //     Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            //   } else {
            //     // type === 'cancel'
            //   }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View sytle={{ paddingHorizontal: 20, }}>
                    <View style={{ width: '100%', }}>
                        <TouchableOpacity style={{ width: 30, height: 45 }}
                            onPress={() => { this.props.navigation.goBack(); }}>
                            <Ionicons color='#fff' name='ios-arrow-back' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../assets/images/sendoLogo.png')} style={{ width: 250, height: 80, }}
                            resizeMode='cover' />
                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20, marginTop: 10, marginBottom: 30, fontWeight: 'bold' }}>Đăng nhập vào Sendo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email hoặc số điện thoại'
                            placeholderTextColor='rgba(255,0,0,0.4)'
                            returnKeyType='next' 
                            autoCapitalize='none'
                            autoCorrect={false}
                            onSubmitEditing={()=>this.passwordInput.focus()}/>
                        <TextInput
                            style={styles.input}
                            placeholder='Mật khẩu'
                            placeholderTextColor='rgba(255,0,0,0.5)'
                            returnKeyType='go'
                            secureTextEntry
                            ref={input=>this.passwordInput = input} />
                        <TouchableOpacity style={[styles.input, { backgroundColor: '#D03627', alignItems:'center', justifyContent:'center' }]} onPress={()=>{console.log('Login....')}}>
                            <Text style={{ color:'#fff', fontSize: 25 }}>Đăng Nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.loginWithFb}>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginTop: 10, fontWeight: '500', marginBottom: 15 }}>Hoặc đăng nhập bằng</Text>
                    <TouchableOpacity style={styles.btnFb} onPress={this.onPressLoginFb}>
                        <Ionicons name='logo-facebook' size={43} color='#fff' style={{ marginRight: 20, }} />
                        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

LoginScreen.navigationOptions = {
    header: null,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20242a',
        paddingTop: STATUSBAR_HEIGHT + 10,
        justifyContent: 'space-between'
    },
    loginWithFb: {
        borderTopWidth: 1,
        borderTopColor: '#3C3F43',
        height: 110,
        alignItems: 'center',
        marginTop: 5
    },
    btnFb: {
        backgroundColor: '#3575E4',
        width: 200,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 10,
    },
    input: {
        width: 350,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        paddingHorizontal: 8,
    }
})
