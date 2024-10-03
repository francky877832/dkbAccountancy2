import { StyleSheet, StatusBar} from "react-native";
import { appColors, appFont, screenWidth, customText, inputTextStyle, screenHeight} from "./commonStyles";


import { commentsStyles } from "./commentsStyles";
import { productStyles } from "./productStyles";
import { card } from "./filtersSearchStyles";
import { shadow } from "react-native-paper";
import { color } from "@rneui/base";

export const offersStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.lightWhite,
    },
    bottom : 
    {
        position : "absolute",
        bottom : 0,
        left : 0,
        right : 0,
        paddingVertical : 20,
        backgroundColor : appColors.white,
    },
    inputContainer : 
    {
       flex : 1,
    },
    offerBottom : 
    {
        ...productStyles.card,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        width : "100%",
        
    },
    offerContainer : //offer sans "s" la ou il ya le prix
    {
        //flex : 1,
    },
    offersContainerFlatlist : //for flatlist
    {
        //flex : 1,
        padding: 20,
        paddingBottom : 130,
        backgroundColor : appColors.lightWhite,
    },
    offer :
    {
        alignItems : "center",
        justifyContent : "center",
        width : "30%",
        height : 50,
        
    },
    offerLeft :
    {
        alignSelf : "flex-start",
    },
    offerRight :
    {
        alignSelf : "flex-end",
    },
    offerTop :
    {
        padding : 10,
        borderWidth : 1,
        borderColor : appColors.white,
        borderRadius : 10,
        width : "100%",
    },
    offerBottomText :
    {
        fontSize : 10,
        verticalAlign : "center",
    },

    input :
    {
        ...customText.text,
        ...inputTextStyle,
        ...commentsStyles.input, 
    },
    inputFocused :
    {
        ...commentsStyles.inputFocused,
    },
    searchBarInput :
    {
        ...commentsStyles.searchBarInput,
    },
    rightIcon :
    {
        ...commentsStyles.sendButton,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
    },
    money : 
    {
        ...customText.text,
        fontWeight : "bold",
    },
    offersBottomConfirmationButtom :
    {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        padding:20,
        borderColor:appColors.lightWhite,
    },
    offersBottomWaiting :
    {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        borderWidth:1,
        padding:20,
        borderColor:appColors.lightWhite
    },

    //FOR PRODUCT
    product : {
        productContainer :
        {
            ...card,
            borderRadius : 0,
            width : '100%',
            borderColor : appColors.lightWhite,
            shadowColor : appColors.lightWhite,
            flexDirection : 'row',
            justifyContent : 'center',
            alignItems : 'center',
            backgroundColor : appColors.clearBlack,
            padding : 10,
            
        },
        productImages :
        {
            ...card,
            width : 40,
            height : 40,
        },
        productName :
        {
            color : appColors.white,
            fontSize : 16,
            fontStyle : 'italic',
        }
    }
})