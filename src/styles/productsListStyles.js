import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";

import { paddingForProductContainer } from "./productStyles";

export const productsListStyles = StyleSheet.create({
    container : 
    {
        flexDirection : "column",
        flex: 1,
    },

    flatlist :
    {
        flexDirection : "column",
        //justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal/2,
    },


//HORİZONTAL FL
    containerHorizontal : 
    {
        flexDirection : "row",
        paddingHorizontal : paddingForProductContainer.horizontal/2,
        backgroundColor : appColors.lightWhite,
    },
 
    flatlistHorizontal :
    {
        //flex: 1,
        flexDirection : "row",
        justifyContent : "center",
        backgroundColor : appColors.lightWhite,
    },


})
