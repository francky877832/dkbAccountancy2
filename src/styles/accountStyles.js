import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText, screenHeight } from "./commonStyles";
import SellerBrand from "../components/common/SellerBrand";




export const accountStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
    },
     top :
    {
        backgroundColor : appColors.white,
    },
    firstLine :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 20,
        backgroundColor : appColors.lightWhite,
    },
    firstLineIcons :
    {
        
    },
    achatsVentesView:
    {
        justifyContent : "space-between",
        alignItems : "center",
    },
    achatsVentes :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 20,
    },
    AchatIcon :
    {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : appColors.lightOrange,
        width : 60,
        height : 60,
        //padding : 5,
        borderRadius : 30,
    },
    text :
    {
        ...customText.text,
    },


    settings :
    {
        backgroundColor : appColors.white,
        padding : 20,
        paddingTop : 2,
        flex:1,
    },

    settingsElement: 
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        height : 60,
        borderBottomWidth : 1,
        borderColor : appColors.lightWhite,
    },
    unavailable :
    {
        backgroundColor : appColors.s,
        color : appColors.gray,
    } ,
})