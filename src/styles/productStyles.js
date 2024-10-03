import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";

export const numProduct = 2
export const paddingForProductContainer = { horizontal : 10, vertical : 10, }

export const marginHorizontal = 5
export const marginVertical = 5
export const screenWidth = Dimensions.get('window').width;
export const cardWidth = (screenWidth/numProduct) - marginHorizontal - paddingForProductContainer.horizontal;

export const productStyles = StyleSheet.create({
    container : 
    {
        backgroundColor : appColors.secondaryColor2,
        width : cardWidth,
        //height : 100,
        marginHorizontal : marginHorizontal,
        marginVertical : marginVertical,
        paddingBottom : 5,
    },
    containerVisibility :
    {
        position : 'absolute',
        width : '100%',
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : appColors.gray,
        opacity : 0.5,
        zIndex : 999,
    },
    containerVisibilityInfo :
    {
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        left : 0,
        right : 0,
        bottom : 0,
        padding : 10,
        zIndex : 9999+1,
        backgroundColor : appColors.secondaryColor5,
        opacity : 1,
    },
    containerHorizontal : //Horizontal container ?
    {
        backgroundColor : appColors.secondaryColor2,
        width : screenWidth/2,
        //height : 100,
        marginHorizontal : marginHorizontal,
        marginVertical : marginVertical,
        paddingBottom : 5,
    },
    imageHorizontal : 
    {
        width : "100%",
        //height: 300 * 1.2,
        borderRadius: 0,
    },


    pressable :
    {
        flex : 1 ,
    },

    image : 
    {
        width : "100%",
        height: cardWidth * 1.2,
        borderRadius: 0,
    },
    text : 
    {
        paddingHorizontal : 10,
        paddingVertical : 5
    },

    shopName :
    {
        fontWeight : "bold",
        fontStyle : "italic",
        fontFamily : appFont.mainFontFamily,
        color : "gray",
        
    },
    productName :
    { 
        //fontWeight : "bold",
        fontStyle : "normal",
        fontFamily : appFont.mainFontFamily,
        color : appColors.secondaryColor5,
        //paddingTop : 7,
        alignSelf : "center",
        fontSize: 15,
    },
    price :
    {
        color : appColors.secondaryColor1,
        fontWeight : "bold",
    },

    top :
    {
        height : 25,
        width : "100%",
        position : "absolute",
        //top : -cardWidth * 1.2,
        flexDirection : "row",
        justifyContent : "space-between",
        paddingHorizontal : 2,
        //marginLeft : -5,
        left : 0,
        right : 0,
        zIndex : 100,
        backgroundColor:appColors.lightBlack,
    },
    bottom :
    {
        top : 5,
        borderRadius: 0,
        padding : 5,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
        flexDirection : "row",
        justifyContent : "center",
    },
    category :
    {
        fontSize : 14,
        fontWeight : "bold",
        fontStyle : "normal",
        fontFamily : appFont.mainFontFamily,
        color : appColors.secondaryColor1,
    },
    feesBy : 
    {
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : appColors.secondaryColor5,
        paddingRight : 4,
    },
    bottomIcons :
    {
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomIconsButton :
    {
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 2,
        flexWrap:'wrap',
        width : 52,
    },


    card : 
    {
        borderRadius: 8,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },

    isBasketPresent : 
    {
        backgroundColor : appColors.secondaryColor5,
        borderColor : appColors.lightBlack,
    },
    isBasketPresentText :
    {
        color : appColors.white,

    }

    
})