import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont, customText, screenHeight } from '../../styles/commonStyles';

const EmptyList = forwardRef((props, ref) => {
    const {text, giveFocus, iconName, iconType, iconColor, iconSize} = props
    //console.log(text)
    let message = (text+"")?.split("|");
    return(
        <View style={[emptyListStyles.container, ]} >
            <Icon type={iconType} name={iconName} size={iconSize} color={iconColor} style={[emptyListStyles.icon, ]} />
            <Text style={[emptyListStyles.text,emptyListStyles.text1 ]} >{message[0]}</Text>
            {giveFocus &&
                <Pressable style={[emptyListStyles.pressable, ]} onPress={()=>{giveFocus();}}>
                    <Text style={[emptyListStyles.text, emptyListStyles.text2,]} >{message[1]}</Text>
                </Pressable>
            }
        </View>
    )})

const emptyListStyles = StyleSheet.create({
    container :
    {
        //flexGrow : 1,
        width : '100%',
        height : '100%',
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 20,
        //marginRight : 20,
        backgroundColor : appColors.white,
        paddingVertical : 20,
    },
    icon :
    {

    },
    pressable :
    {
        width : "100%",
        backgroundColor : appColors.secondaryColor1,
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 20,
        marginTop : 20,

    },
    text :
    {
        ...customText.text,
        fontFamily : appFont.secondaryFontFamily3,
        textAlign : 'center',
        fontWeight : 'bold',
    },
    text1:
    {
        ...customText.text,
        marginTop : 10,
        color : appColors.secondaryColor5,
    },
    text2 :
    {
        color : appColors.white,
    },
})
export default React.memo(EmptyList)