import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailsProductScreen from '../screens/DetailsProductScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import RewardScreen from '../screens/RewardScreen';
import LoginScreen from '../screens/LoginScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ResultSearchScreen from '../screens/ResultSearchScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Provider, connect } from 'react-redux';


// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });


let InforUserFBHomeContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(HomeScreen);
let InforUserFBDetailContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(DetailsProductScreen);
let InforUserFBSearchContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(SearchScreen);
let InforUserFBSearchResultContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(ResultSearchScreen);
let InforUserFBCagegoriesContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(CategoriesScreen);


const HomeStack = createStackNavigator(
  {
    Home: InforUserFBHomeContainer,
    DetailsProduct: InforUserFBDetailContainer,
    Search: InforUserFBSearchContainer,
    Categories: InforUserFBCagegoriesContainer,
    ResultSearch: InforUserFBSearchResultContainer,
  },
  {
    cardStyle: { backgroundColor: "#20242a" },
  }
)

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName != "Home") {
      tabBarVisible = false;
    }
  }

  if (tabBarVisible) {
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            'md-home'
          }
        />
      ),
    };
  }
  else return { tabBarVisible };
};


HomeStack.path = '';

let InforUserFBRewardContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(RewardScreen);

const RewardStack = createStackNavigator(
  {
    Reward: InforUserFBRewardContainer,
  },
  {
    cardStyle: { backgroundColor: "#20242a" },
  }
);

RewardStack.navigationOptions = {
  tabBarLabel: 'Reward Market',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-ribbon'} />
  ),
};

RewardStack.path = '';


let InforUserFBSettingContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(SettingsScreen);

const SettingsStack = createStackNavigator(
  {
    Settings: InforUserFBSettingContainer,
  },
  {
    cardStyle: { backgroundColor: "#20242a" },
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications-outline' : 'md-notifications-outline'} />
  ),
};

SettingsStack.path = '';

let InforUserFBAccountContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch}))(AccountScreen);
let InforUserFBLoginContainer = connect(state => ({ dataUserFB: state.dataUserFB, dataUserLogin: state.dataUserLogin, dataCategories: state.dataCategories, dataProductSeen: state.dataProductSeen, dataProductNominated: state.dataProductNominated, dataSearch: state.dataSearch }))(LoginScreen);

const AccountStack = createStackNavigator(
  {
    Account: InforUserFBAccountContainer,
    Login: InforUserFBLoginContainer,
  },
  {
    cardStyle: { backgroundColor: "#20242a" },
  }
);

AccountStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName != "Account") {
      tabBarVisible = false;
    }
  }

  if (tabBarVisible) {
    return {
      tabBarLabel: 'Account',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
      ),
    };
  }
  else return { tabBarVisible };
};

const tabNavigator = createMaterialBottomTabNavigator({
  HomeStack,
  RewardStack,
  SettingsStack,
  AccountStack,
},
  {
    initialRouteName: 'HomeStack',
    activeColor: '#ec515a',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#20242a', borderTopColor: 'rgb(41, 46, 54)',borderTopWidth: 2, },
  },
);

tabNavigator.path = '';

tabNavigator.navigationOptions = {
}

export default tabNavigator;
