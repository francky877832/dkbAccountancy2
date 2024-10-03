import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Input } from 'react-native-elements';

import { formatMoney } from '../../utils/commonAppFonctions'
import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'
import { appColors, formErrorStyle} from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addAccountancyStyles } from '../../styles/addAccountancyStyles';
import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AccountancyContext } from '../../context/AccountancyContext';

const AddAccountancy = (props) => {

    const navigation = useNavigation()
    const route = useRoute()
    const { user } = useContext(UserContext)
    const { addUserDailyAccountancy } = useContext(AccountancyContext)

    const [checkoutReason, setCheckoutReason] = useState("")
    const [amount, setAmount] = useState(0)
    const [billNo, setBillNo] = useState("")
    const [receivedBy, setReceivedBy] = useState("")
    const [cashBalance, setCashBalance] = useState("")


    const [checkoutReasonFocused, setCheckoutReasonFocused] = useState(false)
    const [amountFocused, setAmountFocused] = useState(false)
    const [billNoFocused, setBillNoFocused] = useState(false)
    const [receivedByFocused, setReceivedByFocused] = useState(false)
    const [cashBalanceFocused, setCashBalanceFocused] = useState(false)


    const [errors, setErrors] = useState({});
    const [isPostLoading, setIsPostLoading] = useState(false)

    const submitAccountancy = async () => {
        try
        {
            setIsPostLoading(true)
            setErrors({})

           
            
            const report = {
                receivedBy,
                reason : checkoutReason,
                amount : parseInt(amount.split('.').join('')),
                billNo,
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
    <View>         
        <ScrollView contentContainerStyle={[addAccountancyStyles.container,{flexGrow: 1}]}>
            <View style={[addAccountancyStyles.containers]}>
                <View style={[addAccountancyStyles.titles]}>
                    <Text style={[addAccountancyStyles.titlesText]}>Motif De Retrait : </Text>
                </View>
                
                <View style={[addAccountancyStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
                        <Input placeholder="EX : Give a reason" value={checkoutReason} onChangeText={(name)=>{setCheckoutReason(name)}}
                            inputMode='text'
                            multiline={true}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setCheckoutReasonFocused(true)}
                            onBlur={() => setCheckoutReasonFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, checkoutReasonFocused && searchBarStyles.inputContainerFocused,  addAccountancyStyles.inputContainer,]}
                        />
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.checkoutReason}</Text>}
                    </View>
                </View>
            </View>

            <View style={[addAccountancyStyles.containers]}>
                <View style={[addAccountancyStyles.titles]}>
                    <Text style={[addAccountancyStyles.titlesText]}>Montant : </Text>
                </View>
                
                <View style={[addAccountancyStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
                        <Input placeholder="EX : Amount" value={amount} onChangeText={(name)=>{setAmount(formatMoney(name))}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setAmountFocused(true)}
                            onBlur={() => setAmountFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, amountFocused && searchBarStyles.inputContainerFocused,  addAccountancyStyles.inputContainer]}
                        />
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.amount}</Text>}
                    </View>
                </View>
            </View>

            <View style={[addAccountancyStyles.containers]}>
                <View style={[addAccountancyStyles.titles]}>
                    <Text style={[addAccountancyStyles.titlesText]}>Numero De Facture </Text>
                </View>
                
                <View style={[addAccountancyStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
                        <Input placeholder="EX : Bill No" value={billNo} onChangeText={(name)=>{setBillNo(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setBillNoFocused(true)}
                            onBlur={() => setBillNoFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, billNoFocused && searchBarStyles.inputContainerFocused,  addAccountancyStyles.inputContainer]}
                        />
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.billNo}</Text>}
                    </View>
                </View>
            </View>

            <View style={[addAccountancyStyles.containers]}>
                <View style={[addAccountancyStyles.titles]}>
                    <Text style={[addAccountancyStyles.titlesText]}>Recu Par : </Text>
                </View>
                
                <View style={[addAccountancyStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
                        <Input placeholder="Name" value={receivedBy} onChangeText={(name)=>{setReceivedBy(name)}}
                            inputMode='text'
                            readOnly={false}
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setReceivedByFocused(true)}
                            onBlur={() => setReceivedByFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, receivedByFocused && searchBarStyles.inputContainerFocused,  addAccountancyStyles.inputContainer,
                            ]}
                        />
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.receivedBy}</Text>}
                    </View>
                </View>
            </View>

            <View style={[addAccountancyStyles.containers]}>
                <View style={[addAccountancyStyles.titles]}>
                    <Text style={[addAccountancyStyles.titlesText]}>Montant En Caisse : </Text>
                </View>
                
                <View style={[addAccountancyStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
                        <Input placeholder="Balance" value={user.cashBalance} onChangeText={(name)=>{setCashBalance(name)}}
                            inputMode='text'
                            multiline={false}
                            readOnly={true}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setCashBalanceFocused(true)}
                            onBlur={() => setCashBalanceFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, cashBalanceFocused && searchBarStyles.inputContainerFocused,  addAccountancyStyles.inputContainer,
                                {backgroundColor:appColors.lightWhite}
                            ]}
                        />
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.cashBalance}</Text>}
                    </View>
                </View>
            </View>


    </ScrollView>

     <View style={{hieght:10}}></View>


        <View style={[addAccountancyStyles.addProductSubmitView,{}]}>
                <CustomButton text="Publier Le Produit" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addAccountancyStyles} onPress={()=>{submitAccountancy()}} />
        </View>


        <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />

    </View>

    )
}

export default AddAccountancy

