import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, FlatList} from 'react-native';


import { appColors, customText } from '../../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';
import { AccountancyContext } from '../../context/AccountancyContext';


const ViewAccountanciesDetails = (props) => {

    const navigation = useNavigation()
    const { fetchAccounters, fetchAccountancies, accounters, accountancies, isLoading, setIsLoading} = useContext(AccountancyContext)
    //On va afficher home en fonciton de admin role


    useEffect(() => {
        const fetchData = async () => {
            await fetchAccountancies()
        }
        //if(!isLoadig)
            fetchData()
    }, [])


    const RenderAccount = (props) => {
        const { item, index } = props
        return (
            <View style={[viewAccountanciesDetailsStyles.container]}>
                
    {/*
                <View style={[viewAccountanciesDetailsStyles.subTitle]}>
                    <Text style={[viewAccountanciesDetailsStyles.subTitleText]}>Semaine Du / AU /</Text>
                </View>
    */}

                <View style={[viewAccountanciesDetailsStyles.record, {backgroundColor:item?.type=='income' ? appColors.lightGreen : appColors.lightRed }]}>
                    <View style={[viewAccountanciesDetailsStyles.recordItem]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}></Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.recordItem]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}></Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.recordItem]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}></Text>
                    </View>
                    <View style={[viewAccountanciesDetailsStyles.recordItem]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}></Text>
                    </View>
                </View>




                
            </View>
        )
    }


    return (
        <View style={[viewAccountanciesDetailsStyles.container]}>

            <FlatList
                    data={accountancies}
                    renderItem={ ({item, index}) => { 
                        return(
                            <RenderAccount account={item} index={index} />
                        ) 
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[viewAccountanciesDetailsStyles.flatlist]}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[viewAccountanciesDetailsStyles.line]}>
                                <Text style={[viewAccountanciesDetailsStyles.titleText]}>Date</Text>
                                <Text style={[viewAccountanciesDetailsStyles.titleText]}>Reason</Text>
                                <Text style={[viewAccountanciesDetailsStyles.titleText]}>Bill</Text>
                                <Text style={[viewAccountanciesDetailsStyles.titleText]}>Balance</Text>
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {}}
            />
        </View>
    )
}

export default ViewAccountanciesDetails


const viewAccountanciesDetailsStyles = StyleSheet.create({
    container :
    {

    },
    line : 
    {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    record :
    {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    recordItem :
    {
        
    },
    subTitle :
    {

    },
    subTitleText :
    {

    },


    titleText :
    {

    },
    recordItemText :
    {
        color : appColors.secondaryColor5,
    }
})
