import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";



export const caourselImageStyles = StyleSheet.create({
    container: 
    {
      justifyContent: 'center',
      alignItems: 'center',
      width : "100%",
      height : "100%",
      top : -40,
      //top : StatusBar.currentHeight,
      //backgroundColor : appColors.red,
    },
    itemContainer: 
    {
      backgroundColor: appColors.white,
      borderRadius: 5,
      height: "100%",
      width: screenWidth,
      borderWidth : 1,
      borderColor : appColors.lightWhite,
    },
    image: 
    {
      width: '100%',
      height: "100%",
    },
  });