import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth } from "./commonStyles";




export const topStyles = StyleSheet.create({
    container : 
    {
        //flex : 1,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        backgroundColor : appColors.white,
        width : screenWidth,
        height : 60,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
    },
//A passer a searchbar
    searchBarContainer :
    {
        
    },
//A passer a searchbar
    searchBarInput :
    {
       
    },
    inputContainerStyle : 
    {
        borderColor : appColors.white,
        //borderWidth : 0,
    },

    pressableBar : 
    {
        width : "90%",
        borderWidth : 0,
    },

    notification : 
    {
        right : 5
    },
    
    searchBar : 
    {
        borderRadius: 5, 
    },
    


})