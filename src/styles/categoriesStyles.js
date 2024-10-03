import { StyleSheet } from "react-native";
import { appColors, customText, screenHeight } from "./commonStyles";
import { appFont } from "./commonStyles";

export const categoriesStyles = StyleSheet.create({
    container: 
    {
      flex: 1,
      backgroundColor : appColors.white,
      
    },
    categoriesContainer :
    {
      //paddingBottom : 20,
      height : screenHeight-180,
    },
    categoryContainer : 
    {
      flexDirection : "row",
    },
    subCategoryContainer : 
    {
      flexDirection : "coloumn",
      //paddingHorizontal : 10,
      //left : 10,
      alignSelf : "flex-start",
      //backgroundColor : "red",
      width : "100%",
      height : screenHeight,
    },  
    pressableCat : 
    {
      justifyContent:"center",
      alignItems:"center",
      paddingVertical : 10,
      borderRightWidth : 1,
      borderBottomWidth : 1,
      borderColor : appColors.secondaryColor3,
      width : 100,
      height : 100,
      //position : "absolute",
      //backgroundColor:"blue",
      zIndex : 100,

    },
    pressableSubCat :
    {
       padding : 20,
       width : "100%",
      //height : 200,
       borderWidth : 1,
       borderColor : appColors.secondaryColor3,
       justifyContent : "center",
  
       //backgroundColor:"blue",

    },
    colorContainer :
    {
      width : "100%",
      justifyContent : "center",
      alignItems : "center",
    },
    pressableColor :
    {
       padding : 5,
       width : "100%",
       justifyContent : "center",
      alignItems : "center",
       //borderWidth : 1,
       //borderColor : appColors.secondaryColor3
    },

    text :
    {
      ...customText.text,
    },
    fullCat :
    {
      backgroundColor : appColors.secondaryColor1,
      padding : 10,
      borderRadius : 20,
    },



//Marque
})

