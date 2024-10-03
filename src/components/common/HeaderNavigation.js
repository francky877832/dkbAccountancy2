import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { Input } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';



const HeaderNavigation = (props) =>
{
    const { title } = props
    const route = useRoute()
    return(
        <View>
            <Text>{title}</Text>
        </View>
    )
}


const herderNavigationStyles = StyleSheet.create({
    container :
    {
        
    }
})

export default HeaderNavigation


