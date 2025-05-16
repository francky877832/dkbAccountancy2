import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';


import { appColors, customText, screenWidth } from '../../styles/commonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AccountancyContext } from '../../context/AccountancyContext';

import { supplyFundsStyles } from './SupplyFunds';
import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addAccountancyStyles } from '../../styles/addAccountancyStyles';
import { homeStyles } from '../../styles/homeStyles';
import { buildExcelData, exportToExcelWeb, formatDate, formatMoney, getDate, getUsername, isValidDate, showAlert } from '../../utils/commonAppFonctions'
import { cardContainer } from '../user/userLoginStyles';
import { UserContext } from '../../context/UserContext';
import { userLoginStyles } from '../user/userLoginStyles';



const ViewAccountanciesDetails = (props) => {

    const navigation = useNavigation()
    const route = useRoute()
    const {accounter} = route.params
    const { fetchAccounters, fetchAccountancies, accounters, accountancies, isLoading, setIsLoading, getSearchedAccountancies, deleteAccountancyRecord,
        updateAccounterBalance,
            } = useContext(AccountancyContext)
    //On va afficher home en fonciton de admin role
    const { user } = useContext(UserContext)

    const [updateComponent, setUpdateComponent] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            const datas = await fetchAccountancies(accounter)
        }
        //if(!isLoadig)
            fetchData()
    }, [updateComponent])

    



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

    const canDelete = () => {
        //if(!(user.email===accounter.email && accounter.email==='comptabilite@dkbglobaltrader.net') )
        if(user.email==='comptabilite@dkbglobaltrader.net')
        {
            //return !(['comptabilite@dkbglobaltrader.net', 'benjamindzogang@dkbglobaltrader.net', 'ornelletsotezo@gmail.com'].includes(accounter.email))
            return true
        } 
        return false
    } 
    
    const RenderAccount = (props) => {
        const { item, index } = props
        //console.log(item)

        const alertDatas = {
            title : 'Alerte',
            text : item.reason,
            icon : 'Information',
            action : null,
       }

       let backgroundColor = ""
       let sign = '+'
       let balance = item.cashBalance
       if(item?.type=='income')
       {    if(item?.user._id==accounter._id)
            {
                backgroundColor = appColors.lightRed
                sign = '-'
            }
            else
            {
                backgroundColor = appColors.lightGreen
                sign = '+'
            }
            

            if(item?.user._id==accounter._id) //on est dans le compte de celui qui a fait supply
            {
                balance = item.cashBalance
            }
            else
            {
                balance = item.supplyCashBalance
            }
       }
       else  if(item?.type=='auto-income')
       {
            backgroundColor = appColors.orange
            sign = '+'
       }
       else
       {
            backgroundColor = appColors.lightRed 
            sign = '-'
       }



        return (
   

                <Pressable onPress={() => showAlert(alertDatas)} style={[viewAccountanciesDetailsStyles.line, {backgroundColor:backgroundColor}]}>
                    
                    {  canDelete() &&
                        <Pressable style={[viewAccountanciesDetailsStyles.cell]} onPress={()=>{handleDeletePressed(item)}}>
                            <Text style={[viewAccountanciesDetailsStyles.recordItemText, {color:appColors.red,fontWeight:'bold'}]}>Delete</Text>
                        </Pressable>
                    }

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{formatDate(item?.date) || item?.date}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.reason.substring(0,20)} {item.reason.length>20 ? "..." :"."}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{sign} {item?.amount}</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.type=='outcome' ? item?.receivedBy : getUsername(item?.supplyTo.email) }</Text>
                    </View>

                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{item?.type=="income" ? (item?.user._id==accounter._id) ? getUsername(item?.supplyTo.email) : getUsername(item?.user.email) : item?.billNo}</Text>
                    </View>
                    <View style={[viewAccountanciesDetailsStyles.cell]}>
                        <Text style={[viewAccountanciesDetailsStyles.recordItemText]}>{balance}</Text>
                    </View>
                </Pressable>
                
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
                Alert.alert('Date Error', 'Entrez une date valide, au format JJ pour day et JJ-MM pour month')
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












    const BalanceModal = ({ visible, setVisible }) => {
        const [password, setPassword] = useState('');
        const [amount, setAmount] = useState("")
        const [adminPassword, setAdminPassword] = useState("")
    
        const [amountFocused, setAmountFocused] = useState(false)
        const [adminPasswordFocused, setAdminPasswordFocused] = useState(false)
        const [adminPasswordShowed, setAdminPasswordShowed] = useState(false)
    
        const handleSubmit = async () => {
        try
        {
            setIsPostLoading(true)

            //console.log("okkkkk")
            //console.log(selectedReceipients)
            //return
            if(adminPassword!='dkbadmin')
            {
                const alertDatas = {
                    title : 'Alerte',
                    text : 'Mot de passe Admin incorrect',
                    icon : 'Error',
                    action : function(){},
                }
    
                showAlert(alertDatas)
                
                return;
            }

            const datas = {
                amount : parseInt(amount.split('.').join('')),
            }
            
            
            const res = await updateAccounterBalance(accounter, datas)

            console.log(datas)
            if(!res)
            {
                throw new Error("Erreur lors de l'ajout du raport")
            }
           const alertDatas = {
                title : 'Alerte',
                text : 'Votre transaction a été effectuée avec success.',
                icon : 'warning',
                action : function(){navigation.navigate('Home')},
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
            setVisible(false)
        }
    }
   // console.log(accountancies)
    
        return (
            <Modal isVisible={visible} onBackdropPress={() => setVisible(false)} backdropOpacity={0.5} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={[viewAccountanciesDetailsStyles.modalContainer]}>
                    <Input placeholder="Amount"
                            value={amount}
                            onChangeText={(a) => setAmount(a)}
                            inputMode="numeric"
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle={[searchBarStyles.inputText]}
                            onFocus={() => setAmountFocused(true)}
                            onBlur={() => setAmountFocused(false)}
                            underlineColorAndroid="transparent"
                            containerStyle={[viewAccountanciesDetailsStyles.containerBox]}
                            inputContainerStyle={[
                                searchBarStyles.inputContainer,
                                amountFocused && searchBarStyles.inputContainerFocused,
                                viewAccountanciesDetailsStyles.inputContainer,
                            ]}
                        />
                        <Input
                            placeholder="Votre Mot De Passe"
                            onChangeText={(pwd) => {setAdminPassword(pwd)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle={[searchBarStyles.inputText]}
                            onFocus={() => setAdminPasswordFocused(true)}
                            onBlur={() => setAdminPasswordFocused(false)}
                            underlineColorAndroid="transparent"
                            containerStyle={[viewAccountanciesDetailsStyles.containerBox]}
                            inputContainerStyle={[
                                searchBarStyles.inputContainer,
                                adminPasswordFocused && searchBarStyles.inputContainerFocused,
                                viewAccountanciesDetailsStyles.inputContainer,
                            ]}
                            rightIcon={
                                adminPasswordShowed ? (
                                    <Pressable onPress={() => setAdminPasswordShowed(false)}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => setAdminPasswordShowed(true)}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                                )
                            }
                            value={adminPassword}
                            secureTextEntry={!adminPasswordShowed}
                        />
                    <Button title="Envoyer" onPress={handleSubmit} />
                </View>
            </Modal>

        );
    };




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

            

            <View style={{height:5}}></View>
                <View style={[{flexDirection:'row', justifyContent:'space-around', width:'100%'}]}>

                   <View style={[{flexDirection:'row'}]}>
                       <Pressable>
                           <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20}]}>Balance : </Text>
                       </Pressable>
       
                       <Pressable>
                           <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20,fontWeight:'bold', color:accounter.cashBalance<0?'red':appColors.green}]}>{accounter.cashBalance} XAF</Text>
                       </Pressable>
                   </View>

                   <Pressable onPress={() => { exportToExcelWeb(buildExcelData(accountancies, accounter, getUsername, formatDate, appColors), getUsername(accounter.email))}}>
                           <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20}]}>Export Excel</Text>
                       </Pressable>

                    <View style={{width:10}}></View>


                {
                    ['visualizer', 'boss'].includes(user.role) &&
                    <View style={[viewAccountanciesDetailsStyles]}>
                       <Pressable onPress={() => { setModalVisible(true)  }}>
                           <Text style={[customText.text, homeStyles.menuItemText, {fontSize:20}]}>Créditer</Text>
                       </Pressable>
                       <BalanceModal visible={modalVisible} setVisible={setModalVisible} />
                   </View>
                }

                </View>
                   <View style={{height:10}}></View>

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
                    ListHeaderComponent={({item}) => {
                        return (
                            <View style={[viewAccountanciesDetailsStyles.line]}>
                            { canDelete() && !(user.email==accounter.email && accounter.email=='comptabilite@dkbglobaltrader.net') &&
                                <View style={[viewAccountanciesDetailsStyles.cell]}>
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Action</Text>
                                </View>
                            }

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
                                    <Text style={[viewAccountanciesDetailsStyles.titleText]}>Received By</Text>
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
    },



 
        modalContainer: {
            width: '80%',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10
        },
        input: {
            width: '80%',
            backgroundColor: 'white',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
        },
    
})
