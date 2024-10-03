import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const preferencesStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        backgroundColor : appColors.lightWhite,
    },
    productContainer : 
    {
        //flex : 1,
        //paddingBottom : 2,
    },
    top :
    {
        width : "100%",
        backgroundColor : appColors.white,
        //height : 35,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    },


    topAnimationBox :
    {
        flexDirection : 'row',
        alignItems :'center',
        backgroundColor : appColors.yellow2,
        height : 25,
    },
    topAnimation :
    {
        backgroundColor : 'transparent',
    },
    animatedText :
    {
        color : appColors.clearBlack,
        //fontWeight : 'bold',
        fontSize : 13,
    },
    winkelBox :
    {
        //position : 'absolute',
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        //backgroundColor : appColors.lightOrange3,
        //left : -20, // en rapport VE L'ANNİMATION from
    },
    winkelText :
    {
        color : appColors.white,
        fontWeight : 'bold',
        fontStyle : 'italic',
    }
})