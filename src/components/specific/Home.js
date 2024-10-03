import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';

import { appColors, customText} from '../../styles/commonStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

const Home = (props) => {
    //console.log('ok--')
    //On va afficher home en fonciton de admin role
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <View style={[homeStyles.container]}>
            <Pressable  style={[homeStyles.menuButton]} onPress={() => { navigation.navigate('ViewAccountancies') }}>
                <Text style={[customText.text, homeStyles.menuText ]}>Visualiser</Text>
            </Pressable>

            <Pressable style={[homeStyles.menuButton]} onPress={() => { navigation.navigate('AddAccountancy') }}>
                <Text style={[customText.text, homeStyles.menuText ]}>Ajouter</Text>
            </Pressable>

            {
                 <Pressable style={[homeStyles.menuButton]} onPress={() => { navigation.navigate('SupplyFunds') }}>
                    <Text style={[customText.text, homeStyles.menuText ]}>Approvisionnement</Text>
                </Pressable>
            }

        </View>
    )
}

export default Home


const homeStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        //backgroundColor : 'red',
    },
    menuButton :
    {
        padding : 20,
        borderRadius : 10
    },
    menuText :
    {
        fontWeight : 'bold'
    },
})
