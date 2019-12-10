import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, NativeModules, Platform, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import * as Facebook from 'expo-facebook';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBarManager.HEIGHT;

const CheckLoadingLogin = (props) => {
    if (props.loading) {
        return (
            <View style={styles.loadingIndicatior}>
                <ActivityIndicator size='large' color='red'></ActivityIndicator>
            </View>)
    }
    else return null;
}

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textUser: '0084FDDDFD25C812292B673906484C8C',
            isLoading: false,
        };
    }

    onPressLoginFb = async () => {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('544644536088007', {
                permissions: ['public_profile', 'email'],
            });
            // console.log(type);
            // console.log(token);
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
                // const json = await response.json();
                // console.log(json);
                // this.props.dispatch({ type: type, data: json });
                // this.props.navigation.navigate('Account');
                this.setState({ isLoading: true })
                const response = await fetch('http://amnhac.pro/public/loginFB', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token
                    }),
                });
                const json = await response.json();
                await this.props.dispatch({ type: type, data: json.info });
                await this.props.navigation.navigate('Account');
                this.setState({ isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    onPressLogin = async () => {
        this.setState({ isLoading: true })
        const response = await fetch('http://amnhac.pro/public/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.textUser,
                pass: null,
            }),
        });
        const status = await response.json();
        if (status.status === 200) {
            await this.props.dispatch({ type: status.status, data: status.info });
            // const responsesss = await fetch('http://amnhac.pro/public/recommend', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         user_id: this.props.dataUserLogin.id,
            //     }),
            // });
            // jsonData = await responsesss.json();
            // jsonData.length = await 6;
            // console.log('login');

            // await this.props.dispatch({type:'dataNominatedSuccess', data: jsonData});
            //await this.props.navigation.push('Home');
            await this.props.navigation.navigate('Account');
        }
        else {
            Alert.alert("Sai tài khoản!!!");
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View sytle={{ paddingHorizontal: 20, }}>
                    <View style={{ width: '100%', marginLeft: 10 }}>
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
                            autoFocus={true}
                            placeholder='Email hoặc số điện thoại'
                            placeholderTextColor='rgba(255,0,0,0.4)'
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            onChangeText={(text) => this.setState({ textUser: text })}
                            value={this.state.textUser} />
                        <TextInput
                            style={styles.input}
                            placeholder='Mật khẩu'
                            placeholderTextColor='rgba(255,0,0,0.5)'
                            returnKeyType='go'
                            secureTextEntry
                            ref={input => this.passwordInput = input}/>
                        <TouchableOpacity style={[styles.input, { backgroundColor: '#D03627', alignItems: 'center', justifyContent: 'center' }]} onPress={this.onPressLogin}>
                            <Text style={{ color: '#fff', fontSize: 25 }}>Đăng Nhập</Text>
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
                {/* <View style={styles.loadingIndicatior}>
                    <ActivityIndicator size='large' color='red'></ActivityIndicator>
                </View> */}
                <CheckLoadingLogin loading={this.state.isLoading} />
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
    },
    loadingIndicatior: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: STATUSBAR_HEIGHT,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.6)'
    }
})
