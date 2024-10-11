import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransitionPresets } from '@react-navigation/stack';


import Home from '../components/specific/Home';
import ViewAccountancies from '../components/specific/ViewAccountancies';
import ViewAccountanciesDetails from '../components/specific/ViewAccountanciesDetails';
import AddAccountancy from '../components/specific/AddAccountancy';
import SupplyFunds from '../components/specific/SupplyFunds';

import UserLogin from '../components/user/UserLogin';
import UserSignup from '../components/user/UserSignup';
import ResetPassword from '../components/user/ResetPassword';
import LoaderPage from '../components/user/LoaderPage';

import HeaderNavigation from '../components/common/HeaderNavigation'
//Contexts

import { UserProvider } from '../context/UserContext';
import { AccountancyProvider } from '../context/AccountancyContext';

import { annimatedStackTransition } from './commonNavigationFonctions'





const Stack = createStackNavigator();



export default function MainNavigation() {



  return ( 
<SafeAreaView style={{ flex: 1, }}>
 <UserProvider>
  <AccountancyProvider>
            
            <Stack.Navigator
              initialRouteName="LoaderPage"
              screenOptions={annimatedStackTransition(0.9, 250, 200)}
            >
                
                <Stack.Screen name="Home" component={Home}  options={{ title: <HeaderNavigation title="Home"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="ViewAccountancies" component={ViewAccountancies}  options={{ title: <HeaderNavigation title="Accountancies"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="ViewAccountanciesDetails" component={ViewAccountanciesDetails}  options={{ title: <HeaderNavigation title="Accountancies Details"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AddAccountancy" component={AddAccountancy}  options={{ title: <HeaderNavigation title="Add Accountancy"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="SupplyFunds" component={SupplyFunds}  options={{ title: <HeaderNavigation title="Add Supply Funds"/>, headerShown : true, tabBarVisible: false, }} />




                <Stack.Screen name="LoaderPage" component={LoaderPage}  options={{ title: <HeaderNavigation title="Loader"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="UserLogin" component={UserLogin}  options={{ title: <HeaderNavigation title="Login"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="UserSignup" component={UserSignup}  options={{ title: <HeaderNavigation title="Sign Up"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword}  options={{ title: <HeaderNavigation title="Reset Password"/>, headerShown : true, tabBarVisible: false, }} />
                   
              
              </Stack.Navigator>
      </AccountancyProvider>       
    </UserProvider>

  </SafeAreaView>
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



