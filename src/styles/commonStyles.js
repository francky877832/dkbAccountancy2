import {StyleSheet, Platform, Dimensions } from "react-native";
export const screen = Dimensions.get("window")
export const screenWidth = screen.width
export const screenHeight = screen.height

export const appColors = {
    mainColor : "#F0F0F0",
    secondaryColor1 : "#f27a1a",
    lightOrange : "rgba(242, 122, 26, 0.1)",
    lightOrange2 : "rgba(242, 122, 26, 0.04)",
    lightOrange3 : "rgba(242, 122, 26, 1)",
    secondaryColor2 : "#fff",
    secondaryColor3 : "#ccc",
    secondaryColor4 : "#777",
    secondaryColor5 : "#444",
    gray : "gray",
    red : "red",
    blue : "rgb(32, 137, 220)",
    green : "green",
    clearGreen : '#90EE90',
    pink : "pink",
    voilet : "violet",
    orange : "orange",
    white : "#fff",
    yellow : '#FFC107',
    yellow2 : '#FFF5Cc',
    lightBlack : "rgba(0, 0, 0, 0.2)",
    black : "rgba(0, 0, 0, 0.9)",
    clearBlack : "rgba(0, 0, 0, 0.7)",
    transparentBlack : "rgba(0, 0, 0, 0.3)",
    lightWhite : "rgba(245, 245, 245, 1)",
    //lightWhite : "rgba(240, 240, 240, 1)",
    //lightWhite2 : "rgba(240, 240, 240, 0.02)",

    skeletonBackgroundColor : "#fff2e0",
    skeletonForegrundColor : "#ffffff",

    transparent : 'rgba(0,0,0,0)',

    lightGreen : 'rgba(19, 243, 19, 0.25)',
    lightRed : 'rgba(249, 28, 19, 0.25)',
}

export const appFont = {
    mainFontFamily : Platform.select({
        ios: 'Helvetica',
        android: 'Roboto',
    }),
    secondaryFontFamily1 :  "Arial",
    secondaryFontFamily2 : "Georgia",
    secondaryFontFamily3 : this.mainFontFamily,
    secondaryFontFamily4 : "Courier",

}

export const appFontSize = {
    mainFontSize : 14,

}
export const customText = {
    text :
    {
        fontFamily : appFont.mainFontFamily,
        fontSize : appFontSize.mainFontSize,
        color : appColors.black,
    },
}

export const inputTextStyle = {
    fontSize: 16,
    color: appColors.secondaryColor5,
    fontFamily : appFont.mainFontFamily,
    fontWeight : "bold",

}

export const formErrorStyle = {
    text :
    {
        color : appColors.red,
    }
    
}

export const disabledButton = 
{
    backgroundColor : appColors.secondaryColor3,
    color : appColors.white,
    fontWeight : 'bold',
}
export const button = 
{
    backgroundColor : appColors.secondaryColor1,
    color : appColors.white,
    fontWeight : 'bold',
} 
export const buttonInvers = 
{
    backgroundColor : appColors.white,
    color : appColors.secondaryColor1,
    fontWeight : 'bold',
} 
export const buttonAccepted = 
{
    backgroundColor : appColors.green,
    color : appColors.white,
    borderWidth : 1,
    borderColor : appColors.green,
    fontWeight : 'bold',
} 