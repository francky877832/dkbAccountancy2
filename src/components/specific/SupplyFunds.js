import React, { useState, forwardRef, useRef, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, Platform} from 'react-native';

import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { CustomButton, CustomModalActivityIndicator } from '../common/CommonSimpleComponents'

import { appColors, customText} from '../../styles/commonStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { formatMoney, getDate, isValidDate, showAlert } from '../../utils/commonAppFonctions'

import { addAccountancyStyles } from '../../styles/addAccountancyStyles';
import { AccountancyContext } from '../../context/AccountancyContext';
import { UserContext } from '../../context/UserContext';
import { cardContainer } from '../user/userLoginStyles';

import Swal from 'sweetalert2';


const SupplyFunds = (props) => {
    //console.log('ok--')
    //On va afficher home en fonciton de admin role
    const navigation = useNavigation()
    const route = useRoute()
    const { user } = useContext(UserContext)
    const { fetchAccounters, addUserDailyAccountancy, accounters, accountancies, isLoading, setIsLoading} = useContext(AccountancyContext)


    const [isPostLoading, setIsPostLoading] = useState(false)



    const [amount, setAmount] = useState(0)
    const [availableReceipients, setAvailableReceipients] = useState([])
        const [date, setDate] = useState(getDate())
    
   
    const [amountFocused, setAmountFocused] = useState(false)
    const [dateFocused, setDateFocused] = useState(false)
    

    const [errors, setErrors] = useState({});

    const [supplyReason, setSupplyReason] = useState(null)
    const [supplyReasonFocused, setSupplyReasonFocused] = useState(false)



    const [selectedReceipients, setSelectedReceipients] = useState('')

    const submitAccountancy = async () => {
        //console.log(accounters)
        //return;
        try
        {
            setIsPostLoading(true)
            setErrors({})

            //console.log("okkkkk")
            //console.log(selectedReceipients)
            //return

            if(!isValidDate(date) || !!amount)
            {
                Alert.alert('Date Error', 'Entrez une date valide, au format JJ/MM/AA')
                return;
            }
            console.log(user)
            const report = {
                reason : user._id==selectedReceipients ? 'auto-supply '+supplyReason : 'Supply',
                amount : parseInt(amount.split('.').join('')),
                billNo : '/',
                supplyTo : selectedReceipients, //id du receipient
                type : user._id==selectedReceipients ? 'auto-income' :'income',
                date : date //getDate()
            }
            //console.log(report)
            //return
            
            const res = await addUserDailyAccountancy(user, report)

            if(!res)
            {
                throw new Error("Erreur lors de l'ajout du raport")
            }
           const alertDatas = {
                title : 'Alerte',
                text : 'Votre transaction a été effectuée avec success.',
                icon : 'warning',
                action : navigation?.goBack,
           }

            showAlert(alertDatas)
            

        }
        catch(error)
        {
            console.log(error)
            //Alert.alert('Error', 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.')
            const alertDatas = {
                title : 'Erreur',
                text : 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.',
                icon : 'warning',
                action : function (){},
           }
        showAlert(alertDatas)

        }finally {
            setIsPostLoading(false)
        }
    }

    const getUsername = (email) => {
        return email.split('@')[0]
    }

    const getAccounters = (accounters) => {
        const accounters_ = accounters
        const username = getUsername(user.email)
        let tmp = []
        if(user.role=='boss')
        {
            tmp = accounters.filter(el => getUsername(el.email) == 'admin')
        }
        else if(user.role=='auto-supplier')
        {
            //console.log("Okkkkk")
            tmp = [user,]
            //tmp = accounters.filter(el => getUsername(el.email) == 'admin')
            //console.log(tmp)
        }
        else if(username=='admin')
        {
            tmp = accounters.filter(el => getUsername(el.email) == 'comptabilite')
        }
        else if(username=='comptabilite')
        {
            tmp = accounters.filter(el => ['kennevarelle9', 'stessydkbglobal', 'dorisndokon3'].includes(getUsername(el.email)))
        }
        //console.log(tmp)
        return tmp
    }
    //console.log(accounters)


    useEffect(() => {
        //console.log(user._id)
       
        const fetchData = async () => {
            fetchAccounters().then(acc => {
                console.log(acc)
                setSelectedReceipients(getAccounters(acc)[0]?._id)
            })

        }
        //if(!isLoadig)
            fetchData()
    }, [])
    return (
        <View style={[supplyFundsStyles.container]}>
            <View style={[supplyFundsStyles.infoContainer]}>
                <View style={[supplyFundsStyles.contents]}>
                        <View style={[supplyFundsStyles.title]}>
                            <Text style={[supplyFundsStyles.titleText]}>Montant</Text>
                        </View>

                        <View style={{height:10,}}></View>
                            <Input placeholder="Montant en XAF" value={formatMoney(amount)} onChangeText={(price)=>{setAmount(formatMoney(price))}}
                                inputMode='numeric'
                                multiline={false}
                                placeholderTextColor={appColors.secondaryColor5}
                                inputStyle = {[searchBarStyles.inputText, ]}
                                onFocus={() => setAmountFocused(true)}
                                onBlur={() => setAmountFocused(false)}
                                underlineColorAndroid='transparent'
                                containerStyle={[supplyFundsStyles.inputBox]}
                                inputContainerStyle = {[searchBarStyles.inputContainer, amountFocused && searchBarStyles.inputContainerFocused,  supplyFundsStyles.inputContainer]}
                            />
                            
                </View> 

                <View  style={[supplyFundsStyles.contents]}>
                    <View style={[supplyFundsStyles.receipient]}>
                        <View style={[supplyFundsStyles.title]}>
                            <Text style={[supplyFundsStyles.titleText]}>Receipient</Text>
                        </View>
                        <View style={{height:10,}}></View>

                        <Picker
                            selectedValue={selectedReceipients}
                            style={[supplyFundsStyles.picker]}
                            onValueChange={(itemValue, itemIndex) => setSelectedReceipients(itemValue)}
                        >
                            
                            {getAccounters(accounters).map((accounter, index) => {
                                //console.log(accounter._id)
                                return <Picker.Item key={index} label={accounter.email} value={accounter._id} />
                            })}
                        
                        </Picker>
                    </View>
                </View>


                {
                    user.role==='auto-supplier' &&

                    <>
                        <View style={{height:10}}></View>

                        <Input placeholder="Motif" value={supplyReason} onChangeText={(r)=>{setSupplyReason(r)}}
                                multiline={false}
                                placeholderTextColor={appColors.secondaryColor5}
                                inputStyle = {[searchBarStyles.inputText, ]}
                                onFocus={() => setSupplyReasonFocused(true)}
                                onBlur={() => setSupplyReasonFocused(false)}
                                underlineColorAndroid='transparent'
                                containerStyle={[supplyFundsStyles.inputBox]}
                                inputContainerStyle = {[searchBarStyles.inputContainer, supplyReasonFocused && searchBarStyles.inputContainerFocused,  supplyFundsStyles.inputContainer]}
                            />
                    </>
                }

                
                <>
                <View style={{width:10,}}></View>
                        <Input placeholder="Date de la transaction" value={date} onChangeText={(name)=>{setDate(name)}}
                            inputMode='text'
                            multiline={false}
                            readOnly={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setDateFocused(true)}
                            onBlur={() => setDateFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[supplyFundsStyles.inputBox]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, supplyReasonFocused && searchBarStyles.inputContainerFocused,  supplyFundsStyles.inputContainer]}
                        />
                </>

            <View style={{height:20}}></View>

            <View style={[addAccountancyStyles.addProductSubmitView,{}]}>
                    <CustomButton text="Valider" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addAccountancyStyles} onPress={()=>{submitAccountancy()}} />
            </View>

            <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />
        </View>
    </View>
    )
}

export default SupplyFunds


export const supplyFundsStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        justifyContent : 'center',
        top : 10,
    },
    infoContainer :
    {
        ...cardContainer,
        width  : '100%',

    },
    contents :
    {
        paddingHorizontal : 10,
    },
    inputContainer : 
    {
        borderRadius : 0,
        borderWidth : 0,
        borderBottom : 1,
        padding : 0,
        left : 0,
        width : '100%',
        
    },
    inputBox :
    {
        backgroundColor : appColors.white,
    },
    picker: 
    {
        padding : 10,
        width: '100%',
        backgroundColor: appColors.white,
        
    },
    titleText :
    {
        fontWeight : 'bold',
        fontSize : 16,
    }
    
})
