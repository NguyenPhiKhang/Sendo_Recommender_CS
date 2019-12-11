import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';


import AppNavigator from './navigation/AppNavigator';


function InfoUserFB(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'success':
      state = action.data;
      return state;
    default:
      return state;
  }
}

function DataCategories(state, action){
  if (typeof state === 'undefined') {
    return [];
  }
  switch (action.type) {
    case 'addDataCategories':
      state = action.data;
      return state;
    default:
      return state;
  }
}

function DataProductSeen(state, action){
  if (typeof state === 'undefined') {
    //console.log(state+'data seeeeeennnn');
    return [];
  }
  switch (action.type) {
    case 'productSeenSuccess':
      state = action.data;
      if(state.length > 10)
        state.length = 10;
      return state;
    default:
      return state;
  }
}

function DataUserLogin(state, action){
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 200:
      state = action.data;
      return state;
    default:
      return state;
  }
}

function DataProductNominated(state, action){
  if (typeof state === 'undefined') {
    return [];
  }
  switch (action.type) {
    case 'dataNominatedSuccess':
      state = action.data;
      return state;
    default:
      return state;
  }
}

function DataSearch(state, action){
  if (typeof state === 'undefined') {
    return [];
  }
  switch (action.type) {
    case 'dataSearchSuccess':
      state = action.data;
      if(state.length > 15)
        state.length = 15;
      return state;
    default:
      return state;
  }
}

let store = createStore(combineReducers({ dataUserFB: InfoUserFB, dataCategories: DataCategories, dataProductSeen: DataProductSeen,
                                          dataUserLogin:  DataUserLogin, dataProductNominated: DataProductNominated, dataSearch: DataSearch}));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
