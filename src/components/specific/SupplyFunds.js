import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';

import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { CustomButton, CustomModalActivityIndicator } from '../common/CommonSimpleComponents'

import { appColors, customText} from '../../styles/commonStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { formatMoney } from '../../utils/commonAppFonctions'

import { addAccountancyStyles } from '../../styles/addAccountancyStyles';
import { AccountancyContext } from '../../context/AccountancyContext';
import { UserContext } from '../../context/UserContext';
import { cardContainer } from '../user/userLoginStyles';

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
    const [selectedReceipients, setSelectedReceipients] = useState()

    const [amountFocused, setAmountFocused] = useState(false)

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            await fetchAccounters()
        }
        //if(!isLoadig)
            fetchData()
    }, [])


    const submitAccountancy = async () => {
        try
        {
            setIsPostLoading(true)
            setErrors({})

           
            
            const report = {
                reason : 'Supply',
                amount : parseInt(amount.split('.').join('')),
                billNo : '/',
                receivedBy : selectedReceipients, //id du receipient
                type : 'outcome',
            }
            const res = await addUserDailyAccountancy(user, report)

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
        <View style={[supplyFundsStyles.container]}>
            <View style={[supplyFundsStyles.infoContainer]}>
                <View style={[supplyFundsStyles.contents]}>
                        <View style={[supplyFundsStyles.title]}>
                            <Text style={[supplyFundsStyles.titleText]}>Montant</Text>
                        </View>

                        <View style={{height:10,}}></View>
                            <Input placeholder="9.999 XAF" value={formatMoney(amount)} onChangeText={(price)=>{setAmount(formatMoney(price))}}
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
                            {accounters.map((accounter, index) => (
                                <Picker.Item key={index} label={accounter.email.split('@')[0]} value={accounter._id} />
                            ))}
                        </Picker>
                    </View>
                </View>


                <View style={{height:20}}></View>


            <View style={[addAccountancyStyles.addProductSubmitView,{}]}>
                    <CustomButton text="Publier Le Produit" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addAccountancyStyles} onPress={()=>{submitAccountancy()}} />
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
