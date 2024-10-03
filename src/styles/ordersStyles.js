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

export const ordersStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        backgroundColor : appColors.lightWhite,
        paddingHorizontal : 5,
        //paddingBottom : 10,
    },
    orderContainer:
    {
        flex : 1,
        backgroundColor : appColors.white,
        paddingVertical : 10,
        top : 10,
        borderRadius : 20,
    },
    
    orderTop :
    {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingVertical : 10,
        paddingHorizontal : 20,
    },
    orderImagesContainer :
    {
        flexDirection : 'row',
    },
    orderTopLeft:
    {

    },
    date:
    {
        
    },
    shipping :
    {
        flexDirection : 'row',
    },
    orderBody:
    {
        borderTopWidth : 1,
        borderColor : appColors.lightBlack,
        paddingHorizontal : 20,
    },
    card : 
    {
        ...card,
    },
    statusLine :
    {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    status :
    {
        flexDirection : 'row',
        
    },
    orderImg:
    {
        
    },
    images:
    {
        width : 30,
        height : 30,
        ...card,
    },
    footer:
    {
        paddingVertical : 10,
    },
    line :
    {
        flexDirection : 'row',
    },

    text : 
    {

    },
    textTitle :
    {
        fontWeight : 'bold',
    },

    sellerBrand :
    {
        ...productDetailsStyles.sellerBrand,
        //backgroundColor : appColors.lightOrange,
    },
    
    

})