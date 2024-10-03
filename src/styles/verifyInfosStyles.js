import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth } from "./commonStyles";
import { customText } from "./commonStyles";
import { card } from "./filtersStyles";

export const verifyInfosStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        borderColor : appColors.lightWhite,
        //backgroundColor : 'red',
    },

    containers :
    {

    },
    titles :
    {
        backgroundColor : appColors.white,
        height : 50,
        flexDirection :"row",
        alignItems : "center",
        paddingLeft : 10,
    },
    titlesText :
    {
        ...customText.text,
        fontWeight : "bold",
        fontSize : 15,
    },
    contents : 
    {
        backgroundColor : appColors.white,
        justifyContent : 'center',
        alignItems : "center",
        //backgroundColor:'blue',
        paddingVertical : 10,
    },
    inputContainer :
    {
        borderColor: appColors.lightWhite,
        paddingHorizontal : 5,
        backgroundColor: appColors.white,
        justifyContent : "center",
        alignItems : "center",
        alignSelf : "center",
        borderColor: appColors.lightWhite,
        borderWidth : 0,
        borderBottomWidth : 2,
        padding : 0,
        //backgroundColor:'red',
    },
    inputBox : 
    {
        padding: 0, 
        margin: 0, 
        height: 50,
        width: '100%',
        //backgroundColor:'blue',
    },  
    secondaryBox : 
    {
        paddingBottom : 10,
        paddingLeft : 10,
        justifyContent : 'center',
        alignItems : "center",
        alignSelf : 'flex-start',
        //backgroundColor : 'red',
    },
    secondaryText :
    {
        ...customText.text,
        fontStyle : 'italic',
        color : appColors.secondaryColor5,
    },

    radiocontainers :
    {
        backgroundColor : appColors.lightWhite,
        //position : "absolute",
        left : 0,
        right : 0,
        //bottom : 0,
        top : 50,
        padding : 0,
    },
    radioContents :
    {
        //backgroundColor : appColors.lightWhite,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : "center",
    },
    radioItem :
    {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : "center",
    },
    pressableContrat :
    {

    },
    pressableContratText :
    {
        fontWeight : 'bold',
        color : appColors.secondaryColor1,
        textDecorationLine: 'underline',
        textShadowColor: appColors.orange, 
        textShadowOffset: { width: -0.5, height: 0.5 },
        textShadowRadius: 1,
    },


    bottom : 
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.white,
        height : 70,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
        paddingHorizontal : 10,
        //alignSelf : 'flex-end',
    },

    acheter :
    {
        flex : 1,
        borderRadius : 5,
    },
    button:
    {
        shadowColor : appColors.white,
        justifyContent : "center",
        alignItems : "center",
        height : 50,
        borderRadius : 50,
    },
    buttonText:
    {
        textAlign : "center",
        fontWeight : "bold",
    },
    price :
    {
        flex : 1,
        flexDirection : 'row',
        alignItems : "center",
        //justifyContent : 'space-evenly',
        paddingHorizontal : 5,
        //backgroundColor:'red',
    },


    modalContainer :
    {
        flex: 1, 
        //position : "absolute",
        width: screenWidth,
        alignSelf : 'center',
        alignItems : "center",
        justifyContent: 'center',
        borderBottomWidth : 1,        
        backgroundColor: appColors.clearBlack,
        zIndex : 101,
    },
    modalContent : 
    {
        ...card,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : appColors.lightWhite,
        width : '90%',
        paddingHorizontal : 40,
        paddingVertical : 20,
        borderWidth : 1,
        borderColor : appColors.clearBlack,
        borderRadius : 10,
    },

   


})