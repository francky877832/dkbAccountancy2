import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont, customText, screenHeight } from '../../styles/commonStyles';
import { adminPannelStyles } from './styles/adminPannelStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { OrdersContext } from '../../context/OrdersContext';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDateToLitteral } from '../../utils/commonAppFonctions';

const AdminPanel = (props, ref) => {
    const { } = props
    const { getOrderFromAdmin, updateOrderFromAdmin } = useContext(OrdersContext)

    const [isPostLoading, setIsPostLoading] = useState(false)

    //const [deliveryDate]

    const [orderNo, setOrderNo] = useState("")
    const [orders, setOrders] = useState({})
    const [group, setGroup] = useState({})

    //const obj=15;
    const [isOrderNoFocused, setIsOrderNoFocused] = useState(false)

    const [groupStatus, setGroupStatus] = useState(group?.status)
    const [paymentStatus, setPaymentStatus] = useState(group?.paymentStatus)
    const [productsStatus, setProductsStatus] = useState({status:{}, buyerConfirmation:{}, delivererConfirmation:{}, deliveryDate:{}})

    
    const updateProductsStatus = (label, product, value) => {
        setProductsStatus(prev => {
            return {
                ...prev,
                [label] : {[product] : value}
            }
        })
    }

    const getOrder = async (orderNo) => {
        //console.log(orderNo)
        try
        {
            setIsPostLoading(true)

            const datas = await getOrderFromAdmin(orderNo)
            //console.log(datas)
           let status = {}
            datas?.orders[0]?.products?.forEach(item => {
                    let product = item.product
                    status = {
                        "status":{...status["status"], [product]:item?.status},
                        "delivererConfirmation":{...status["delivererConfirmation"], [product]:item?.delivererConfirmation},
                        "buyerConfirmation":{...status["buyerConfirmation"], [product]:item?.buyerConfirmation},
                        "deliveryDate":{...status["deliveryDate"], [product]:item?.deliveryDate}
                    }
                
            })

            /*const obj = ps?.reduce((acc, value, index) => {
                acc[index] = value;
                acc = {acc, value}
                return acc;
            }, {});*/

            //console.log(obj)
            setProductsStatus(status)
            setOrders(datas.orders[0])
            setGroup(datas.group)
            setGroupStatus(datas.group.status)
            setPaymentStatus(datas.group.paymentStatus)
            //console.log(ps)
        

        }catch(error){
            console.log(error)
            return []
        }finally {
            setIsPostLoading(false)
        }
    }

    const updateOrder = async (orders, group) => {
        try
        {
            setIsPostLoading(true)

            const orderDatas = {
                ...orders,
                products : orders.products.map(el => {
                    return {
                        ...el,
                        status : productsStatus["status"][el.product] || el.status,
                        buyerConfirmation : productsStatus["buyerConfirmation"][el.product] || el.buyerConfirmation,
                        delivererConfirmation : productsStatus["delivererConfirmation"][el.product] || el.delivererConfirmation,
                        deliveryDate : productsStatus["deliveryDate"][el.product] ?  new Date().toISOString() : null,

                        //deliveryNo : productsStatus["deliveryNo"][el.product],
                        //deliveryDate : productsStatus["deliveryDate"][el.product],
                    }
                })
            }

            const groupDatas = {
                ...group,
                status : groupStatus,
                paymentStatus : paymentStatus
            }
            
            await updateOrderFromAdmin(orderDatas, groupDatas)

        }catch(error){
            console.log(error)
            return []
        }finally {
            setIsPostLoading(false)
        }
    }

    useEffect(() => {
        const fetchDatas = async () => {
            await getOrder(orderNo)
        }

        fetchDatas()
    }, [])

    const OrderProduct = (props) => {
        const { item } = props

    

        return (
            <View  style={[adminPannelStyles.contents, {borderBottomWidth:1,borderColor:appColors.lightWhite}]}>
                    <View style={[adminPannelStyles.titles,]}>
                        <Text style={[customText.text, adminPannelStyles.titlesText]}>Product : {item.product}</Text>
                    </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View style={[adminPannelStyles.subTitle]}>
                        <Text style={[customText.text, adminPannelStyles.subTitleText]}>Status</Text>
                    </View>

                    <Picker selectedValue={productsStatus["status"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("status", item.product, itemValue)}>
                        <Picker.Item label="Pending" value="pending" />
                        <Picker.Item label="Shipped" value="shipped" />
                        <Picker.Item label="Delivered" value="delivered" />
                        <Picker.Item label="Canceled" value="canceled" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View style={[adminPannelStyles.subTitle]}>
                        <Text style={[customText.text, adminPannelStyles.subTitleText]}>Deliverer Confirmation : </Text>
                    </View>
                    <Picker selectedValue={productsStatus["delivererConfirmation"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("delivererConfirmation", item.product, itemValue)}>
                        <Picker.Item label="Failed" value="0" />
                        <Picker.Item label="Success" value="1" />
                        <Picker.Item label="Processing" value="2" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View style={[adminPannelStyles.subTitle]}>
                        <Text style={[customText.text, adminPannelStyles.subTitleText]}>Buyer Confirmation</Text>
                    </View>

                    <Picker selectedValue={productsStatus["buyerConfirmation"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("buyerConfirmation", item.product, itemValue)}>
                        <Picker.Item label="Failed" value="0" />
                        <Picker.Item label="Success" value="1" />
                        <Picker.Item label="Processing" value="2" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View style={[adminPannelStyles.subTitle]}>
                        <Text style={[customText.text, adminPannelStyles.subTitleText]}> Delivery No</Text>
                    </View>
                    
                    {!item.deliveryNo ?
                        <Pressable>
                            <Text style={[customText.text, adminPannelStyles.titlesLabel]}>Generate</Text>
                        </Pressable>
                        :
                        <View>
                            <Text style={[customText.text, adminPannelStyles.titlesLabel]}>{item.deliveryNo}</Text>
                        </View>
                    }
                    
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View style={[adminPannelStyles.subTitle]}>
                        <Text style={[customText.text, adminPannelStyles.subTitleText]}> Delivery Date</Text>
                    </View>
                    
                    {!item.deliveryDate ?
                        <Pressable onPress={()=>{updateProductsStatus("deliveryDate", item.product, !productsStatus["deliveryDate"][item.product])}}
                            style={[adminPannelStyles.deliveryDate, {backgroundColor:productsStatus["deliveryDate"][item.product] ? appColors.green : appColors.gray }]}
                        >
                            <Text style={[customText.text, adminPannelStyles.titlesLabel, {color:appColors.white}]}>{productsStatus["deliveryDate"][item.product] ? "Now" : "Not Now"}</Text>
                        </Pressable>
                        :
                        <View>
                            <Text style={[customText.text, adminPannelStyles.titlesLabel]}>{formatDateToLitteral(item.deliveryDate)}</Text>
                        </View>
                    }
                    
                </View>
            </View>
        )
    }

    return(
        <ScrollView contentContainerStyle={[adminPannelStyles.container, ]}>
            <View style={[adminPannelStyles.contents]} >
                <View style={[adminPannelStyles.orderNoTitle]}>
                    <Text style={[customText.text, adminPannelStyles.titlesText]}>Numero De Commande</Text>
                </View>
                <Input placeholder="Numero de commande" value={orderNo} onChangeText={(no)=>{setOrderNo(no)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsOrderNoFocused(true)}
                            onBlur={() => setIsOrderNoFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[adminPannelStyles.inputContainer ]}
                />
            </View>

            <View style={[adminPannelStyles.addProductSubmitView,{}]}>
                <CustomButton text="Chercher" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={adminPannelStyles} onPress={() => {getOrder(orderNo)}} />
            </View>



{ Object.keys(group).length>0 && Object.keys(orders).length>0 &&
    <>
            <View style={[adminPannelStyles.containers,{}]}>
                <View style={[adminPannelStyles.group,{}]}>
                    <View style={[adminPannelStyles.titles,{}]}>
                        <Text style={[customText.text, adminPannelStyles.titlesText]}>Informations sur le groupe</Text>
                    </View>

                    <View style={[adminPannelStyles.contents,{}]}>
                        <View style={[adminPannelStyles.line,{}]}>
                            <View style={[adminPannelStyles.subTitle]}>
                                <Text style={[customText.text, adminPannelStyles.subTitleText]}>Status : </Text>
                            </View>
                           
                            <Picker selectedValue={groupStatus} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => setGroupStatus(itemValue)}>
                                <Picker.Item label="Pending" value="pending" />
                                <Picker.Item label="Shipped" value="shipped" />
                                <Picker.Item label="Delivered" value="delivered" />
                            </Picker>

                        </View>

                        <View style={[{height:10}]}></View>

                        <View style={[adminPannelStyles.line,{}]}>
                            <View style={[adminPannelStyles.subTitle]}>
                                <Text style={[customText.text, adminPannelStyles.subTitleText]}>Payment Status : </Text>
                            </View>
                            
                            <Picker selectedValue={paymentStatus} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => setPaymentStatus(itemValue)}>
                            <Picker.Item label="Payment Pending" value="payment_pending" />
                                <Picker.Item label="Payment Successful" value="payment_successful" />
                                <Picker.Item label="Payment Failed" value="payment_failed" />
                            </Picker>
                        </View>
                    </View>
                </View>


                <View style={{height:20}}></View>

                <View style={[adminPannelStyles.products]}>
                {
                    orders?.products?.map((item, key) => { 
                        return( 
                            <View key={key}>
                                <OrderProduct item={item}  />
                                <View style={{height:10}}></View>
                            </View>
                    )})
                }

                </View>    
            </View>

                <View style={[adminPannelStyles.addProductSubmitView,{}]}>
                    <CustomButton text="Mettre A Jour" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={adminPannelStyles} onPress={() => {updateOrder(orders, group)}} />
                </View>
    </>
}

<CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Chargement en cours..." />

        </ScrollView>
    )
}

export default AdminPanel