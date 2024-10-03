import { StyleSheet, Dimensions, StatusBar, FlatList } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";
import { card } from './ordersStyles'


export const ordersDetailsStyles = StyleSheet.create({
    container: 
    {
        flex : 1,
    },
    flatlist:
    {
        backgroundColor : appColors.lightWhite,
        paddingHorizontal : 3,
        top : 5,
        paddingBottom : 40,
    },
    topContainer: 
    {
        backgroundColor : appColors.white,
        paddingHorizontal : 20,
        ...card,
        paddingVertical : 10,
        borderRadius : 10,
    },
    orderContainer :
    {
        backgroundColor : appColors.white,
        ...card,
        paddingVertical : 10,
        paddingHorizontal : 10,
        
    },
    top:
    {
        paddingHorizontal : 20,
    },
    seller:
    {
        paddingVertical : 20,
        paddingHorizontal : 20,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor : appColors.lightWhite,
    },
    product : 
    {
        paddingVertical : 5,
    },
    status:
    {
        flexDirection : 'row',
        alignItems : 'center',
    },
    orderBody :
    {
        flexDirection : 'row',
        alignItems : 'center',
        //justifyContent : 'center',
        paddingHorizontal : 20,
    },
    productDetails :
    {

    },
    orderImg :
    {
        width : 80,
        height : 100,
    },
    image :
    {
        flex:1,
        ...card,
    },
    productDetails :
    {
        paddingLeft : 20,
    },
    ordersDetails:
    {
        
    },
    address :
    {
        backgroundColor : appColors.white,
        paddingVertical : 20,
        paddingHorizontal : 20,
        ...card,
    },
    addressDetails :
    {
        paddingHorizontal : 25,
    },
    payment :
    {
        backgroundColor : appColors.white,
        paddingVertical : 20,
        paddingHorizontal : 20,
        ...card,
    },
    paymentDetails :
    {
        paddingHorizontal : 25,
    },
    line:
    {
        flexDirection : 'row',
    },

    text :
    {
        
    },
    textLeft :
    {
        color:appColors.gray,
        fontSize : 14,
    },
    textRight :
    {
        fontWeight : 'bold',
        color:appColors.black,
        fontSize : 14,
    },

    button :
    {
        padding : 10,
        borderRadius : 5,
        //width : 200,
    },
    buttonText :
    {
        fontWeight : 'bold',
    },
    
    
  });