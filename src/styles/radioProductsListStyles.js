import { StyleSheet, StatusBar, Pressable } from "react-native";
import { appColors, appFont, screenWidth, customText } from "./commonStyles";




export const radioProductsListtStyles = StyleSheet.create({
    container : 
    {
        flex : 1,  
        backgroundColor : appColors.white, 
        borderTopWidth : 2,
        borderTopColor : appColors.lightWhite,
    },
    top :
    {
        flex : 1,
        paddingBottom : 80,        
        backgroundColor : appColors.white, 

    },
    flatListContainer :
    {
        //flex : 1,
        //backgroundColor : appColors.red, 
    },
    bottom :
    {
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        //paddingHorizontal : 20,
        paddingVertical : 15,
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.white,
        borderTopWidth : 2,
        borderTopColor : appColors.secondaryColor3,
    },
    buttonView :
    {
        justifyContent : "center",
        alignItems : "center",
        //backgroundColor:"red",
    },
    bottomPrice : 
    {
        //flex : 1,
        justifyContent : "center",
        left : 10,
        //backgroundColor : appColors.green,
    },
    price :
    {
        ...customText.text,
        
    },
    pressable :
    {
        //flex : 1,
        paddingVertical: 10,
        paddingHorizontal : 50,
        borderRadius : 20,
    },  

})

export const radioProductStyles = StyleSheet.create({
    container : 
    {
       //flex : 1,  
    },
    radioGroup :
    {
        //flex : 1,
        //borderColor : appColors.red,
    },
    seller :
    {
        
    },
    
    radioGroup1 :
    {
        
    },
    radioGroup2 :
    {
        
    },
    radioContainer :
    {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        
    },
    radioContainer1 :
    {
        borderTopWidth : 2,
        borderTopColor : appColors.lightWhite,
        borderBottomWidth : 2,
        borderBottomColor : appColors.lightWhite,
        paddingVertical : 5,
        backgroundColor : appColors.lightWhite,
    },
    sellerBrand :
    {
        flexDirection : 'row',
        alignItems : 'center',
    },
    sellerImage : 
    {
        width : 35,
        height : 35,
        borderRadius : 20,
    },
    radioContainer2 :
    {
        paddingTop : 10,
    },
    radioProducts :
    {
        left : 10,
    },
    imageContainer :
    {
        width:75,

    },
    soldBox :
    {
        //position : 'absolute',
        width : '100%',
        //height : '100%',
        justifyContent : 'Center',
        alignItems : 'center',
        top : -100/2,
        backgroundColor : appColors.clearBlack,
    },
    soldText:
    {
        color : appColors.white,
    },
    productImage :
    {
        width : 75,
        height : 80
    },
    productInfos :
    {
        flexDirection : "row",
    },
    inBasket :
    {
        top : 2,
        //left : 40,
        borderWidth : 2,
        borderColor : appColors.yellow,
        borderRadius : 10,
        backgroundColor : appColors.lightOrange,
        width : screenWidth/2,
        //alignSelf : "center",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 5,
        //alignSelf : 'flex-start'
    },
    checkBoxContainer :
    {
        borderWidth:0, 
        padding:0, 
        backgroundColor:appColors.white,
        justifyContent:'center',
    },
    checkBoxText : 
    {
        marginLeft:0,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    },


    inBasketQuantity :
    {
        //top:10, 
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width:'100%', 
        paddingRight:350,
        left : 90,
        alignSelf : 'center',
        //borderBottomWidth : 1,
        //borderColor : appColors.secondaryColor3,
    },
    trash :
    {
        //alignSelf : 'flex-end',
    },
    quantityContainer :
    {
        //height : 30,
        //width : '100%',
        borderWidth : 0,
        
    },
    inputContainer :
    {
        borderRadius : 0,
        borderWidth : 0,
        borderBottom : 1,
        width : 50,
    },
    inputContainerFocused :
    {
        borderBottomWidth : 1,
        borderColor : appColors.secondaryColor1,
    }

})