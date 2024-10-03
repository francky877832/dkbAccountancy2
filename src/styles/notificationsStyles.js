import { StyleSheet, StatusBar, Pressable } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const notificationsStyles = StyleSheet.create({
    scene: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : appColors.white,

    },
    sceneContainers :
    {
        paddingBottom : 50,
    },
    item :
    {
        width : '100%',
        borderTopWidth : 1,
        borderTopColor : appColors.white,

    },
    itemRead :
    {
        backgroundColor : appColors.white,
    },
    pressable :
    {
        flexDirection : 'row',
        alignItems: 'center',
        //justifyContent : "center",
        //width : '100%',
        backgroundColor : appColors.lightOrange,
        paddingHorizontal : 10,
        paddingVertical : 20,
    },
    icon :
    {
        justifyContent : 'center',
        alignItems : 'center',
        width : 40,
        height : 40,
        borderRadius : 20,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
    },
    sinceDate :
    {
        left : 70,
        //backgroundColor : appColors.white,
    },
    textDate :
    {   
        color : appColors.secondaryColor4,
        fontSize : 13,
        fontStyle : 'italic',
    },
    content : 
    {
        flexWrap : 'wrap',
        left : 15,
    },
    message :
    {
        //flexWrap : 'wrap',
        paddingRight : 50,
        left : 20,
        //backgroundColor:'red',
    },
    title:
    {

    },
    titleText:
    {
        fontWeight:'bold',
        fontSize:16,
        color : appColors.secondaryColor5,
    },
    messageText:
    {
        
    },


})