
import { StyleSheet } from "react-native"
import { appColors } from "./commonStyles"
import { cardContainer } from "../components/user/userLoginStyles"

export const homeStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    menu :
    {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    menuItem : 
    {

    },
    menuItemText : 
    {
        fontWeight : 'bold',
        fontSize : 15,
        color : appColors.blue,
    },

    logoBox : 
    {
        height : 300,
       width : '100%',
       justifyContent : 'center',
        alignItems : 'center',
    },
    logoImage :
    {
        height : '100%',
        width : '90%'
    },
    infoContainer :
    {
        ...cardContainer,
        justifyContent : 'center',
        alignItems : 'center',
        width  : '100%',
    },
    menuButton :
    {
        padding : 20,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : appColors.lightWhite,
        width : '100%',
        alignItems : 'center',
        marginTop : 5,
        backgroundColor : appColors.blue,
    },
    menuText :
    {
        fontWeight : 'bold',
        fontSize : 16,
        color : appColors.white,
    },
})
