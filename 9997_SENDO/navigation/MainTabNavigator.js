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


// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    DetailsProduct: DetailsProductScreen,
    Search : SearchScreen,
  },
  {
    cardStyle: {backgroundColor: "#20242a"},
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
  else return {tabBarVisible};
};


HomeStack.path = '';

const RewardStack = createStackNavigator(
  {
    Reward: RewardScreen,
  },
  {
    cardStyle: {backgroundColor: "#20242a"},
  }
);

RewardStack.navigationOptions = {
  tabBarLabel: 'Reward Market',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-ribbon'} />
  ),
};

RewardStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    cardStyle: {backgroundColor: "#20242a"},
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications-outline' : 'md-notifications-outline'} />
  ),
};

SettingsStack.path = '';

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    Login: LoginScreen,
  },
  {
    cardStyle: {backgroundColor: "#20242a"},
  }
);

AccountStack.navigationOptions=({ navigation }) => {
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
  else return {tabBarVisible};
};


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  RewardStack,
  SettingsStack,
  AccountStack,
},
  {
    tabBarOptions: {
      style: { backgroundColor: "#20242a", },
      activeTintColor: '#ec515a',
    },
  }
);

tabNavigator.path = '';

tabNavigator.navigationOptions = {
}

export default tabNavigator;
