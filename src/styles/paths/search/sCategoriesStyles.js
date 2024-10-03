import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText } from "../../commonStyles";
import { productStyles } from "../../productStyles";
import { productDetailsStyles } from "../../productDetailsStyles";


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

export const sCategoriesStyles = StyleSheet.create({
    container : 
    {
        backgroundColor : appColors.lightWhite,
        flex : 1,
        
    },
    categoriesContainer :
    {
        backgroundColor : appColors.white,
    },
    pressableCat :
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
   
    checkBoxPressable :
    {

    },
    checkBoxContainer : 
    {
       flex : 1,
    },
    itemText : 
    {

    },



    //CONDITION
    

    


    //PRICE
    
    priceContainer : 
    {
        flexDirection : "column",
        marginTop : 10,
        width: screenWidth,
        backgroundColor : appColors.lightWhite,
        flex : 1,
    },
    price : 
    {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : appColors.white,
        paddingVertical : 20,
    },
    pricesContainer : 
    {
        paddingHorizontal : 10,
        width : '100%',
        paddingVertical : 20,
    },
    priceInput :
    {
        //paddingLeft : 10,
        backgroundColor : appColors.lightWhite,
        height : 50,
        paddingLeft : 10,
        color : appColors.clearBlack,
        fontWeight : 'bold',
        fontSize : 16,
    },
    priceInputFocused:
    {
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
    },

    //Boutton Appliquer
    bottomButtonContainer :
    {
        padding : 20,
        backgroundColor : appColors.white,
        position : 'absolute',
        left : 0,
        right : 0,
        bottom : 0,
    },
    pressable : 
    {
        paddingVertical:15,
        borderRadius:50,
        width:"100%",
    },

    //COLORS
    colorsContainer : 
    {
        //flex : 1,
        backgroundColor : appColors.lightWhite,

        paddingVertical : 20,
        paddingHorizontal : 5,
        justifyContent : "center",
        alignItems : "center",
    },

    pressableColor :
    {
        paddingHorizontal : 5,
        justifyContent : "center",
        alignItems : "center",

    },
    colorMulticolor :
    {
        width:40,
        height:40,
        borderRadius:20,
        justifyContent : "center",
        alignItems : "center",
    },
    pressableColorContainer :
    {
        paddingBottom : 10,
        paddingHorizontal : 15,

    },
    iconCheck :
    {
        position: 'relative',
        zIndex: 99, 
    },

    
})