import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText, screenHeight } from "./commonStyles";
import { card } from "./filtersStyles";




export const addAccountancyStyles = StyleSheet.create({
    container : 
    {
        flexGrow : 1,
        top : 0,
        //backgroundColor : appColors.white,
    },
    containers :
    {
        
    },
    titles :
    {
        backgroundColor : appColors.lightWhite,
        height : 50,
        flexDirection :"row",
        alignItems : "center",
        paddingLeft : 20,
    },
    contents :
    {
        //height : 7,
        backgroundColor : appColors.white,
        flexDirection : "row",
        alignItems : "center",
        padding : 20,
        paddingRight : 0,
        
    },
    titlesText :
    {
        ...customText.text,
        fontWeight : "bold",
        fontSize : 16,
    },
    normalText :
    {
        ...customText.text,
        fontSize : 14,
        color : appColors.secondaryColor5

    },
    imageBox :
    {
        width:100,
        height:100,
        borderWidth : 1,
        borderColor : appColors.secondaryColor4,
        justifyContent : "center",
        alignItems : "center",
        
    },
    imageCloseButton:
    {
        width: 20,
        height: 20,
        backgroundColor: appColors.lightBlack,
        position: "absolute",
        alignSelf: "flex-end",
        top: 0,
    },
    bottomPicker :
    {
        ...card,
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        padding : 20,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        paddingHorizontal : 20,
        backgroundColor : appColors.lightWhite,
        borderTopWidth : 2,
        borderTopColor : appColors.white,
        zIndex : 99,
    },

    inputContainer : 
    {
        borderRadius : 0,
        borderWidth : 0,
        borderBottom : 1,
        padding : 0
    },
    radioBox : 
    {
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        width : "100%",
    },
    radioContainer : 
    {
        flexDirection : "row",
        alignItems : "center",
    },
    categoryContainer :
    {
        backgroundColor : appColors.white,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "flex-start",
        padding : 0,
        paddingRight : 0,
        wifth : "100%",
    },
    pressableDetails :
    {
        padding : 15,
        borderBottomWidth:1,
        borderColor:appColors.secondaryColor3,
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
    },

    addProductSubmitView :
    {
        position : "relative",
        left : 0,
        right : 0,
        bottom : 0,
        width : "100%",
        height : 60,
    },
    pressable :
    {
        padding : 20,
        justifyContent : "center",
        alignItems : "center",
        flex : 1,
        //borderRadius : 20,
    },
    text :
    {
        ...customText.text,
        fontWeight : "bold",
    },


    modalContainer: {
        flex: 1,
        backgroundColor: appColors.clearBlack,
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullImage: {
        width: '90%',
        height: '70%',
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: appColors.red,
        borderRadius: 5,
      },
      closeButtonText: {
        fontSize: 16,
        color: appColors.white,
      },

})