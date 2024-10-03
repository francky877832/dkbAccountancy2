import { StyleSheet, } from "react-native";
import { appColors, appFont, screenHeight, screenWidth } from "./commonStyles";




export const validatePaymentStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        //justifyContent : 'center',
        alignItems : 'center',
        top : screenHeight/4,
        paddingHorizontal : 20,
    },
    successInfosContainer :
    {

    },
    errorsContainer :
    {

    },

    successInfosText :
    {
        textAlign : 'center',
        fontSize : 15,
    },
    successInfosLink :
    {
        color : appColors.blue,
        textDecorationLine : 'underline',
        fontSize : 15,
    },

    errorsText :
    {
        textAlign : 'center',
        fontSize : 15,
    },
    errorsLink : 
    {
        color : appColors.blue,
        textDecorationLine : 'underline',
        fontSize : 15,
    },
})
