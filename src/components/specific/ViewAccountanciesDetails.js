import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, FlatList} from 'react-native';

import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { appColors, customText, screenWidth } from '../../styles/commonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AccountancyContext } from '../../context/AccountancyContext';

import { supplyFundsStyles } from './SupplyFunds';
import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addAccountancyStyles } from '../../styles/addAccountancyStyles';
import { formatMoney, getDate, isValidDate, showAlert } from '../../utils/commonAppFonctions'
import { cardContainer } from '../user/userLoginStyles';
import { UserContext } from '../../context/UserContext';


const ViewAccountanciesDetails = (props) => {

    const navigation = useNavigation()
    const route = useRoute()
    const {accounter} = route.params
    const { fetchAccounters, fetchAccountancies, accounters, accountancies, isLoading, setIsLoading, getSearchedAccountancies, deleteAccountancyRecord} = useContext(AccountancyContext)
    //On va afficher home en fonciton de admin role
    const { user } = useContext(UserContext)

    const [updateComponent, setUpdateComponent] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            const datas = await fetchAccountancies(accounter)
        }
        //if(!isLoadig)
            fetchData()
    }, [updateComponent])

    

    const getUsername = (email) => {
        return email.split('@')[0].slice(0, 10);
    }

    const handleDeletePressed = async (item) => {
       
       const deleteARecord = async () => {
            try
            {
                setIsPostLoading(true)
                

                const res = await deleteAccountancyRecord(item)
                
                const alertDatas = {
                    title : 'Alerte',
                    text : 'Record supprime avec succes',
                    icon : 'warning',
                    action : function (){},
            }

                showAlert(alertDatas)
                setUpdateComponent(prev=>!prev)
            }
            catch(error)
            {
                console.log(error)
                const alertDatas = {
                    title : 'Erreur',
                    text : 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.',
                    icon : 'warning',
                    action : function action(){},
            }
            showAlert(alertDatas)

            }finally {
                setIsPostLoading(false)
            }
       }

       const alertDatas = {
        title : 'Alerte',
        text : 'Etes vous sur de vouloir supprimer cette ligne ? L\'operation est irreversible. Et de plus cela ne modifiera pas l\etat actuel de vos caisse.',
        icon : 'warning',
        action : async function () { deleteARecord() },
        refuseAction : function (){}
   }

    showAlert(alertDatas)


    }
    const RenderAccount = (props) => {
        const { item, index } = props
        //console.log(item)

        return (
   

                <View style={[viewAccountanciesDetailsStyles.line, {backgroundColor:item?.type=='income' ? (item?.user._id==accounter._id) ? appColors.lightRed : appColors.lightGreen : appColors.lightRed  }]}>
                    <Pressable style={[viewAccountanciesDetailsStyles.cell]} onPress={()=>{handleDeletePressed(item)}}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText, {color:appColors.red,fontWeight:'bold'}]}>Delete</Text>
                    </Pressable>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.date}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.reason}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.type=='income'? (item?.user._id==accounter._id ? "-":"+") : "-"} {item?.amount}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.type=="income" ? (item?.user._id==accounter._id) ? getUsername(item?.supplyTo.email) : getUsername(item?.user.email) : item?.billNo}</Text>
                    </View>
                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.type=="income" ? (item?.user._id==accounter._id) ? item?.cashBalance : item?.supplyCashBalance : item?.cashBalance}</Text>
                    </View>
                </View>
                
        )
    }

    const [selectedDate, setSelectedDate] = useState("Day")
    const [date, setDate] = useState(getDate())
    const [dateFocused, setDateFocused] = useState(false)
    const [isPostLoading, setIsPostLoading] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const searchedAccountancies = async () => {
        try
        {
            setIsPostLoading(true)
            const date_ = selectedDate.toLowerCase() ==='day' ? date : '01/'+date
            //console.log(date_)

            if(!isValidDate(date_))
            {
                Alert.alert('Date Error', 'Entrez une date valide, au format JJ pour day et JJ/MM pour month')
                return;
            }
            
            
            await getSearchedAccountancies(date)

        }
        catch(error)
        {
            console.log(error)
            Alert.alert('Error', 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.')
        }finally {
            setIsPostLoading(false)
        }
    }

    return (
        <ScrollView horizontal={true} contentContainerStyle={[viewAccountanciesDetailsStyles.container]}>

        <View style={[{flex:1}]}>
            <View style={[viewAccountanciesDetailsStyles.topSearch]}>
                <Pressable style={[viewAccountanciesDetailsStyles.searchButton, {alignItems:'center', backgroundColor:!showSearch?appColors.green:appColors.red}]} onPress={()=>{setShowSearch(prev=>!prev)}}>
                    <Text style={[customText.text, {color:appColors.white, fontWeight:'bold'}]}>{!showSearch ? "Chercher" : "Fermer"}</Text>
                </Pressable>
            {showSearch &&
                <>
                    <View style={[viewAccountanciesDetailsStyles.topElInput,{}]}>
                        <Input placeholder="Date" value={date} onChangeText={(name)=>{setDate(name)}}
                                inputMode='text'
                                multiline={false}
                                readOnly={false}
                                maxLength={100}
                                placeholderTextColor={appColors.secondaryColor3}
                                inputStyle = {[searchBarStyles.inputText, ]}
                                onFocus={() => setDateFocused(true)}
                                onBlur={() => setDateFocused(false)}
                                underlineColorAndroid='transparent'
                                containerStyle={ [viewAccountanciesDetailsStyles.containerBox,]}
                                inputContainerStyle = {[searchBarStyles.inputContainer, dateFocused && searchBarStyles.inputContainerFocused,  viewAccountanciesDetailsStyles.inputContainer,
                                ]}
                        />
                    </View>

                    <View style={{width:10}}></View>

                    <View style={[viewAccountanciesDetailsStyles.topEl,{}]}>
                        <Picker
                            selectedValue={selectedDate}
                            style={[viewAccountanciesDetailsStyles.picker]}
                            onValueChange={(itemValue, itemIndex) => setSelectedDate(itemValue)}
                            >
                            {['Day', 'Month'].map((item, index) => (
                                <Picker.Item key={index} label={item} value={item} />
                            ))}
                        </Picker>
                    </View>
                            
                        <View style={{width:10}}></View>

                        <View style={[viewAccountanciesDetailsStyles.topEl,{}]}>
                            <CustomButton text="Filtrer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={viewAccountanciesDetailsStyles} onPress={()=>{searchedAccountancies()}} />
                        </View>
                </>
            }
            </View>

            

       
            <FlatList
                    data={accountancies}
                    renderItem={ ({item, index}) => { 
                        return(
                            <RenderAccount item={item} index={index} />
                        ) 
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[viewAccountanciesDetailsStyles.flatlist]}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[viewAccountanciesDetailsStyles.line]}>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Action</Text>
                                </View>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Date</Text>
                                </View>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Reason</Text>
                                </View>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Amount</Text>
                                </View>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Bill</Text>
                                </View>

                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Balance</Text>
                                </View>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                      
                    }}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={[{width:screenWidth, justifyContent:'center', alignItems:'center'}]}>
                                <Text style={[viewAccountanciesDetailsStyles.titleText]}>Pas de donnees</Text>
                            </View>
                        )
                    }}
            />

           


            
     <View style={{hieght:10}}></View>


            

            <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />
        </View>
    </ScrollView>
    )
}

export default ViewAccountanciesDetails


const viewAccountanciesDetailsStyles = StyleSheet.create({
    container :
    {
        flexGrow : 1,
        //paddingHorizontal : 10,
    },
    searchButton :
    {
        padding : 10,
    },
    topSearch :
    {
        //flexDirection : 'row',
        //justifyContent : 'space-around',
        //alignItems : 'center',
        width : screenWidth,
        backgroundColor : appColors.white,
        //height : 60,
    }, 
    topSearchEl : 
    {
        //width : screenWidth/4,
    },
    inputContainer :
    {
        width : '100%',
        borderRadius : 0,
        borderWidth : 0,
        borderBottom : 1,
        padding : 0
    },
    containerBox :
    {
        backgroundColor : appColors.white,
    },
    picker :
    {
        padding : 10,
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
    cell :
    {
        width : 200,
        height : 30,
        borderRightWidth : 1,
        borderColor : appColors.white,
        justifyContent :'center',
        alignItems : 'center',
    },
    subTitle :
    {

    },
    subTitleText :
    {

    },


    titleText :
    {
        color : appColors.secondaryColor5,
        fontWeight : 'bold',
        fontSize : 15,
    },
    recordItemText :
    {
        color : appColors.secondaryColor5,
    },

    pressable :
    {
        padding : 20,
    }
})
