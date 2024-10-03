import { StyleSheet, } from "react-native";
import { appColors, appFont, customText, inputTextStyle } from "./commonStyles";


export const searchBarStyles = StyleSheet.create({
    container: 
    {
        flex : 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: appColors.mainColor,
        borderBottomColor: appColors.mainColor,
        backgroundColor : appColors.white,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        //height : 35,
        paddingHorizontal : 10,
    },
    containerBox :
    {
        flex:1,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 5,
        backgroundColor: appColors.white,
    },
    prevButton : 
    {
        top : 0,
    },
    inputText : 
    {
        ...customText.text,
        ...inputTextStyle,
        fontSize: 16,
        color: '#333',
        fontFamily : appFont.mainFontFamily,
    },
    inputContainer : 
    {
        borderWidth: 1,
        borderColor: appColors.lightWhite,
        paddingHorizontal : 5,
        backgroundColor: appColors.white,
        justifyContent : "center",
        alignItems : "center",
        alignSelf : "center",
        borderWidth : 1,
        borderColor: appColors.lightWhite,
        borderRadius : 60,
    },
   
    inputContainerFocused : 
    {
        borderWidth : 1,
        borderColor: appColors.secondaryColor1,
    },

    
})
