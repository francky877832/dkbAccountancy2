import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';


import { CustomModalActivityIndicator } from '../common/CommonSimpleComponents'
import { appColors, customText } from '../../styles/commonStyles';
import { AccountancyContext } from '../../context/AccountancyContext';
import { useNavigation } from '@react-navigation/native';

import { cardContainer } from '../user/userLoginStyles';
const ViewAccountancies = (props) => {
    const navigation = useNavigation()
    const { fetchAccounters, fetchAccountancies, accounters, accountancies, isLoading, setIsLoading} = useContext(AccountancyContext)

    //const accounter = ['Ange','Ornella', 'Fadyl', 'Joel', 'Abdel']
    //const [accounters, setAccounters] = useState(accounter)
    //On va afficher home en fonciton de admin role


    const handleAccounterPressed = (item) => {
        //console.log(item)
        navigation.navigate('ViewAccountanciesDetails', {accounter:item})
    }

useEffect(() => {
    const fetchData = async () => {
        await fetchAccounters()
    }
    //if(!isLoadig)
        fetchData()
}, [])

    return (
        <View style={[viewAccountanciesStyles.container]}>
           {/*  <View style={[viewAccountanciesStyles.top]}>
                    <Text style={[customText.text, viewAccountanciesStyles.topTitle]}>Accounters</Text>
                </View>
                */
            }
            <View style={[viewAccountanciesStyles.infoContainer]}>
               
                <FlatList
                        data={accounters}
                        renderItem={ ({item}) => { 
                            return(
                                <Pressable style={[viewAccountanciesStyles.item]} onPress={()=> {handleAccounterPressed(item)}}>
                                    <Text style={[customText.text, viewAccountanciesStyles.itemText]}>{ item.email.split('@')[0] }</Text>
                                </Pressable>
                            ) 
                        } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        contentContainerStyle={[viewAccountanciesStyles.flatlist]}
                        style={[{width:'100%',}]}
                        ListEmptyComponent={() => {}}
                />


<CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />
        </View>
    </View>
    )
}

export default ViewAccountancies


const viewAccountanciesStyles = StyleSheet.create({

    container :
    {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',

        top : 10,
    },
    top :
    {
        flex : 1,
        alignItems : 'center',
    },
    topTitle :
    {

    },
    infoContainer :
    {
        ...cardContainer,
        position : 'absolute',
        flex : 1,
        width  : '100%',

    },
    contents :
    {
        paddingHorizontal : 10,
    },
    flatlist :
    {
        justifyContent : 'center',
        //alignItems : 'center',
        width : '100%',
        height : '100%',
        paddingHorizontal : 10,
        //backgroundColor : 'red',
    },
    item :
    {
        padding : 20,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
    },
    itemText :
    {

    },

    titles :
    {

    },
    titlesText :
    {

    }
})
