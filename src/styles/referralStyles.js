import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";



export const referralStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        paddingVertical : 30,
        backgroundColor : appColors.lightOrange,
    },
    topContainer :
    {
        justifyContent : "center",
        alignItems : "center",
    },
    menu :
    {
        top : 50,
        alignItems : 'center',
        justifyContent : 'center',
        //paddingHorizontal : 20,
        backgroundColor : appColors.lightOrange,
        paddingVertical : 30,
    },

    referralElement: 
    {
        justifyContent : 'center',
        alignItems : "center",
        width : 150,
    },
    unavailable :
    {
        backgroundColor : appColors.s,
        color : appColors.gray,
    } ,

    button:
    {
        ...productStyles.card,
        shadowColor : appColors.white,
        justifyContent : "center",
        alignItems : "center",
        height : 50,
        width : 200,
        borderRadius : 5,
        backgroundColor : appColors.secondaryColor1,
    },
    buttonText:
    {
        textAlign : "center",
        fontWeight : "bold",
        color : appColors.white,
        fontSize : 18,
    },
    text :
    {
        ...customText.text,
        textAlign : 'center',
    },
    title :
    {
        fontWeight : 'bold',
        fontSize : 25,
        color : appColors.clearBlack,
    },
    pointsText :
    {
        fontWeight : 'bold',
        fontSize : 60,
        color : appColors.secondaryColor1,
    },
    menuText : 
    {
        //fontWeight : 'bold',
        fontSize : 18,
    },

})