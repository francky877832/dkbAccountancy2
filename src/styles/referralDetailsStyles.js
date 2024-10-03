import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";



export const referralDetailsStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        //backgroundColor : appColors.lightOrange,
    },
    menu :
    {
        top : 50,
    },
    flatlist :
    {
        backgroundColor : appColors.white,
        paddingBottom : 280,
    },
    renderTitleBox :
    {
        backgroundColor : appColors.secondaryColor1,
        borderBottomWidth : 1,
        borderColor : appColors.white,
    },
    renderTitle :
    {
        fontSize : 20,
        color : appColors.white,
        fontWeight : 'bold',
        paddingVertical : 20,
    },
    text :
    {
        ...customText.text,
        textAlign : 'center',
    },
   

})