import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";

import { productStyles } from "./productStyles";
import { productDetailsStyles } from "./productDetailsStyles";


export const card  = {
        borderRadius: 8,
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
    }

export const filtersSearchStyles = StyleSheet.create({
    container : 
    {
        backgroundColor : appColors.lightWhite,
        flex : 1,
    },

    filtres :
    {
        justifyContent : "center",
        backgroundColor : appColors.white,
        zIndex : 100,
        top : 5
    },
    pressableFilter :
    {
        borderWidth : 1,
        borderColor : appColors.lightWhite,
        paddingVertical : 20,
        paddingHorizontal : 10,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
        width : '100%',
    },
    pressableFilterDisabled:
    {
        //borderWidth : 1,
        //borderColor : appColors.red,
        backgroundColor : appColors.lightWhite,
    },
    itemText :
    {
        //fontWeight : 'bold',
        fontSize : 15,
        color : appColors.clearBlack,
    },



    pressableFilterTextDisabled:
    {
       color : appColors.red,
    },
    pressableFilterFocused :
    {
        borderWidth : 2,
        borderColor : appColors.secondaryColor1,
        backgroundColor : appColors.lightOrange,
    },
    
    pressableFilterTextDisabled:
    {
       //textDecorationLine : "line-through",
       color : appColors.red,
    },


    selectedFilters :
    {
        fontSize : 11,
        color : appColors.gray,
        fontStyle : 'italic',
    }
})