import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton } from '../common/CommonSimpleComponents';

const UserSignup = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const loginUserWithEmailAndPassword = () => {
        
    }


    return(
        <View style={[{flex:1}]}>
            <Button title="Login" onPress={()=>{navigation.navigate("UserLogin")}} />
            <View>
                <Input placeholder="Posez une question" onChangeText={(text)=>{setEmail(text)}}
                        multiline={true}
                        numberOfLines={1}
                        placeholderTextColor={appColors.lightWhite}
                        inputStyle = {[userLoginStyles.input, isFocused && userLoginStyles.inputFocused,]}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        underlineColorAndroid='transparent'
                        inputContainerStyle={ { borderBottomWidth:isFocused?0:1, }}
                        leftIcon={ 
                            <Pressable onPress={() => {}}>
                                <Icon name='send-sharp' type='ionicon' size={24} color={appColors.secondaryColor1} />
                            </Pressable>
                        }
                        value={email}
                    />

                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Nom De Votre Boutique" onChangeText={(shop)=>{setUsername(shop)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isUsernameFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='basket-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isUsernameCorrect === 'true'  ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isUsernameCorrect === 'false'  ?
                                 <Pressable onPress={() => {}}>
                                 <Icon name='close-circle-outline' type='ionicon' size={24} color={appColors.red} />
                             </Pressable>
                                :
                                false
                            }
                            value={username}
                        />   
                </View> 

                    <CustomButton text="Valider" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
                </View>
                    <Button title="Login" onPress={()=>{navigation.navigate("UserLogin")}} />

        </View>
    )
}


export default UserSignup


