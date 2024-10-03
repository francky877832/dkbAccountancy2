import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { card } from "./filtersStyles";




export const profilShopStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        backgroundColor : appColors.lightWhite,
        //paddingBottom : StatusBar.currentHeight,
    },
    productContainer : 
    {
        flex : 1,
        paddingBottom : 2,
    },
    topContainer :
    {
        width : "100%",
        backgroundColor : appColors.lightOrange2,
        padding : 10,
        //height : 180,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    },

//TOP ELEMENTS
    topTop :
    {
        flexDirection : "row",
        alignItems : "center",
        width : "100%",
    },
    prevButton :
    {
        
    },
    
    notifParameter :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        //left : -100,
    },

//follow
    follow : 
    {
        top : 5,
        flexDirection : "row",
        justifyContent : "space-between",
        padding : 10
    },
    followInformations:
    {
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-between",
    },
    followButton:
    {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 10,
        paddingVertical : 5,
        backgroundColor:appColors.secondaryColor1,
        borderRadius : 5,
    },
    followLeftElements :
    {
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        paddingRight : 5,
    },
    sold : 
    {
       
    },
    follower : 
    {

    },
    following : 
    {

    },
    favourites :
    {

    },

    followFocused :
    {
        backgroundColor : appColors.white,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1
    },

    addProduct :
    {
        position : "absolute",
        bottom : 0,
        left : 0,
        right : 0,
        justifyContent : "center",
        alignItems : "center",
        height : 35,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.lightWhite,
        //paddingVertical : 5,

    },
    pressable :
    {
        paddingVertical : 5,
        paddingHorizontal : 20,
        borderRadius : 20,
    },

})