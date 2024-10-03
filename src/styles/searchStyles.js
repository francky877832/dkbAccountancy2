import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, screenHeight} from "./commonStyles";

import { customText } from "./commonStyles";

export const searchStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
    },
    filter :
    {
        //flex : 1,
        backgroundColor : appColors.white,
        height : 300,
        borderTopWidth : 1,
        borderTopColor : appColors.lightWhite,
    },
    searchBar : 
    {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
       height : 80,
    },
//A passer a searchbar
    searchBarContainer :
    {
        
    },
//A passer a searchbar
    searchBarInput :
    {
        
    },

    historyLabelContainer:
    {
        alignSelf : "center", 
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        paddingHorizontal: 20,
    },
    
    historyContainer :
    {
       flex : 1,
       top : 20,
       backgroundColor : appColors.white,
    },
    history:
    {
        flex : 1,
        flexDirection:"row", 
        justifyContent:"flex-start",
        alignItems : "center",
        paddingVertical : 15,
        paddingHorizontal : 10,
        backgroundColor : appColors.lightWhite,
        width : "100%",

    },
    historyFlatlist:
    {
        flex : 1,
        backgroundColor : appColors.white,
        paddingLeft : 10,
        marginTop : 10,
        //paddingBottom : 60,
    },
    textHistory :
    {
        color : "#555",
        fontFamily : appFont.secondaryFontFamily3,
        fontWeight : "bold",
        marginLeft : 10,
    },
    historySeparator:
    {
        width:"96%", 
        marginLeft : "2%",
        borderBottomWidth : 1,
        borderBottomColor : appColors.white,
    },

    historyLabel:
    {
        fontWeight : "bold",
    },
    label :
    {
        ...customText.text,
        fontSize : 16,
       fontFamily : appFont.secondaryFontFamily3,
       fontWeight : "bold",
       color : appColors.secondaryColor5,
    },
    vider:
    {
        color : appColors.secondaryColor1,
    },
    
    submit:
    {
        width : "100%",
        top : 20, 
        flexDirection : "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pressableSubmit:
    {
        flex : 1,
        backgroundColor : appColors.secondaryColor1,
        paddingVertical : 20,
    },
    textSubmit:
    {
        //flex : 1,
        color : appColors.white,
        textAlign : "center",
    },
    
//FOR PRODUCTLIST
    productContainer :
    {
        backgroundColor : appColors.white,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    }
    

})