import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, Image} from 'react-native';

import { appColors, customText} from '../../styles/commonStyles';
import { homeStyles } from '../../styles/homeStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

import { cardContainer } from '../user/userLoginStyles';
import { UserContext } from '../../context/UserContext';
const Home = (props) => {
    //console.log('ok--')
    //On va afficher home en fonciton de admin role
    const navigation = useNavigation()
    const route = useRoute()
    const {user} = useContext(UserContext)

    const view = ['admin', 'boss', 'visualizer']
    const add = ['admin', 'cashier', 'supplier', 'auto-supplier']
    const supply = ['admin', 'boss', 'supplier', 'auto-supplier']
    return (
        <View style={[homeStyles.container]}>

            <View style={[homeStyles.menu]}>

        {['boss', 'admin'].includes(user?.role) &&
        
                <Pressable style={[homeStyles.menuItem]} onPress={() => {navigation.navigate('UserLogin', {page:'register'})}}>
                    <Text style={[customText.text, homeStyles.menuItemText ]}>Sign Up</Text>
                </Pressable>
         }
    
                <View style={{width:10}}></View>
    
                <Pressable style={[homeStyles.menuItem]} onPress={() => {navigation.navigate('UserLogin', {page:'login'})}}>
                    <Text style={[customText.text, homeStyles.menuItemText ]}>Logout</Text>
                </Pressable>
            </View>

        <View style={{height:5}}></View>
            <View style={[homeStyles.menu]}>
                <Pressable>
                    <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20}]}>Balance : </Text>
                </Pressable>

                <Pressable>
                    <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20,fontWeight:'bold', color:user.cashBalance<0?'red':appColors.green}]}>{user.cashBalance} XAF</Text>
                </Pressable>
            </View>

            <View style={{height:10}}></View>
    
    

            <View style={[homeStyles.logoBox]}>
                <Image source={require('../../assets/logos/logo1.jpg')}  style={[homeStyles.logoImage]}/>
            </View>

            <View style={{height:10}}></View>

            <View style={[homeStyles.infoContainer]}>
                
                <Pressable  style={[homeStyles.menuButton, {backgroundColor:!view.includes(user.role)?appColors.secondaryColor5:appColors.blue}]} onPress={() => { view.includes(user.role) ? navigation.navigate('ViewAccountancies') : null }}>
                    <Text style={[customText.text, homeStyles.menuText ]}>Visualiser</Text>
                </Pressable>

                <Pressable style={[homeStyles.menuButton, {backgroundColor:!add.includes(user.role)?appColors.secondaryColor5:appColors.blue}]} onPress={() => { add.includes(user.role) ? navigation.navigate('AddAccountancy') : null }}>
                    <Text style={[customText.text, homeStyles.menuText ]}>Ajouter</Text>
                </Pressable>

                {
                    <Pressable style={[homeStyles.menuButton, {backgroundColor:!supply.includes(user.role)?appColors.secondaryColor5:appColors.blue}]} onPress={() => { supply.includes(user.role) ? navigation.navigate('SupplyFunds') : null }}>
                        <Text style={[customText.text, homeStyles.menuText ]}>Approvisionnement</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default Home
