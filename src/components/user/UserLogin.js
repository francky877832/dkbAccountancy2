import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RadioButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';


import { appColors, customText, appFont, formErrorStyle } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents';

import auth from '@react-native-firebase/auth';


import { server } from '../../remote/server';
import { serialize, getFirebaseErrorMessage, showAlert } from '../../utils/commonAppFonctions'
import { UserContext } from '../../context/UserContext';


import userValidationSchema from '../forms/validations/userValidation';
import * as Yup from 'yup';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addAccountancyStyles } from '../../styles/addAccountancyStyles';


const UserLogin = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, updateUser, setIsAuthenticated, signupUserWithEmailAndPassword, loginUserWithEmailAndPassword} = useContext(UserContext)

    const [credentialType, setCredentialType] = React.useState(route?.params?.page || 'login');
    const [role, setRole] = useState('cashier')


    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const [location, setLocation] = useState("")

    const [isLoading, setIsLoading] = useState(false)


    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [adminPasswordFocused, setAdminPasswordFocused] = useState(false)
    const [locationFocused, setLocationFocused] = useState(false)

    
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)
    const [adminPasswordShowed, setAdminPasswordShowed] = useState(false)


    const [isEmailCorrect, setIsEmailCorrect] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState("")
    const [isUsernameCorrect, setIsUsernameCorrect] = useState("")


    const [errors, setErrors] = useState({});


    const signUpUser = async (email, username, password)  => {
        try
        {
            setIsLoading(true)
            const form = {email, password, username:email.split('.')[0], adminPassword:adminPassword}
            await userValidationSchema.validate(form, { abortEarly: false });

            
            //const userCredential  = await auth().createUserWithEmailAndPassword(email, password)
            signupUserWithEmailAndPassword(email, username, password, adminPassword, role, location).then(async ()=> {
                const alertDatas = {
                    title : 'Alert',
                    text : 'Nouveau membre enregistre avec succes',
                    icon : 'warning',
                    action : navigation?.goBack,
               }
            showAlert(alertDatas)
    
            })
        }
        catch(error)
        {
            console.log(error)
            if (error instanceof Yup.ValidationError) 
            {
                const formErrors = {};
                    error.inner.forEach(err => {
                        formErrors[err.path] = err.message;
                });
                        //console.log(formErrors)
                setErrors(formErrors);
            }
            else
            {
                const alertDatas = {
                    title : 'Erreur',
                    text : 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.',
                    icon : 'warning',
                    action : function (){},
               }
    
                if(error.code)
                {
                    showAlert({...alertDatas, text:getFirebaseErrorMessage(error.code)})
                    return;
                }
                showAlert(alertDatas)
                

            }

        }finally{
            setIsLoading(false)
        }
            
    }

//console.log(user)   
const loginUser = async (email, username, password) => {
    try
    {
        setIsLoading(true)
        const formData = new FormData()
        
    /*
        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        const firebase_user = userCredential.user;
        
        if(!firebase_user)
        {   
            const error = new Error('Utilisateur non trouvé');
            error.code = 'auth/user-not-found';
            throw error;
        }
    */
        //lors de la reinitialisation
    /*
        formData.append('password', password); //OR firebase_user.password
        const newUser = await updateUser(email, formData);
    */
        let user;
      
      
        user = await loginUserWithEmailAndPassword(email, username, password,)

//console.log(user)
        if(!user)
        {   
            const error = new Error('Utilisateur non trouvé');
            error.code = 'auth/user-not-found';
            throw error;

        }

        navigation.replace('Home');
        return;
    }
    catch(error)
    {
        
        console.log(error)

      
        const alertDatas = {
            title : 'Erreur',
            text : 'Verifier votre connexion a Internet. Si cela persiste contacter l\'admin.',
            icon : 'warning',
            action : function (){},
       }

        if(error.code)
        {
            showAlert({...alertDatas, text:getFirebaseErrorMessage(error.code)})
            return;
        }
        showAlert(alertDatas)
        
        return;
    }finally{
        setIsLoading(false)
    }
}

// {errors.images && <Text style={[formErrorStyle.text]}>{errors.images}</Text>}
/*
<LinearGradient
                colors={['#f27a1a', '#ff8a2a', '#ba5c11', '#551b01']} // Ajoutez autant de couleurs que nécessaire
                locations={[0.2, 0.1, 0.3, 0.7]} // Réglez les pourcentages de chaque couleur
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1, }}
                style={[{flex:1,}]}
                >
                    <View style={[userLoginStyles.titleBox]}>
                        <Text style={[userLoginStyles.title]}>Connectez-Vous</Text>
                    </View>
                </LinearGradient>
            */
           //console.log(user)
    return(
<View style={[userLoginStyles.container]}>
                        
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1, justifyContent:'center'}} scrollEnabled={true}>
            <ScrollView contentContainerStyle={[userLoginStyles.infoContainer, {}]}>
            <View  style={[userLoginStyles.registerOrLogin]}>  
                <RadioButton.Group onValueChange={newValue => setCredentialType(newValue)}  value={credentialType} >
                    <View style={[userLoginStyles.credentialGroup]}>
                    {['boss', 'admin'].includes(user?.role) &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="register" />
                            <Text>Register</Text>
                        </View>
                    }

            
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="login" />
                            <Text>Login</Text>
                        </View>
            

                    </View>
                </RadioButton.Group>
            </View>

                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Email" onChangeText={(text)=>{setEmail(text)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input, ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[userLoginStyles.inputContainer, isEmailFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='email' type='entypo' size={24} color={isEmailFocused?appColors.secondaryColor1:appColors.black} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isEmailCorrect === 'true' ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isEmailCorrect === 'false' ?
                                 <Pressable onPress={() => {}}>
                                 <Icon name='close-circle-outline' type='ionicon' size={24} color={appColors.red} />
                             </Pressable>
                             :
                             false
                            }
                            value={email}
                        /> 
                        {errors.email && <Text style={[formErrorStyle.text]}>{errors.email}</Text>}
                </View>

                <View style={{height:10}}></View>

               


                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{setPassword(pwd)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isPasswordFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='lock-closed-sharp' type='ionicon' size={24} color={isPasswordFocused?appColors.secondaryColor1:appColors.black} />
                                </Pressable>
                            }
                            rightIcon = {
                                isPasswordShowed ?
                                    <Pressable onPress={()=>{setIsPasswordShowed(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsPasswordShowed(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                            value={password}
                            secureTextEntry={!isPasswordShowed}
                        /> 
                        {errors.password && <Text style={[formErrorStyle.text]}>{errors.password}</Text>} 
                </View>   

            {
                credentialType=='register' && 

                <>
                <View  style={[userLoginStyles.registerOrLogin]}>  
                <RadioButton.Group onValueChange={newValue => setRole(newValue)}  value={role} >
                    <View style={[userLoginStyles.credentialGroup]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="admin" />
                            <Text>Admin</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="supplier" />
                            <Text>Supplier</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="visualizer" />
                            <Text>Visualiser</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <RadioButton value="cashier" />
                            <Text>Cashier</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>


      

                    <View style={[userLoginStyles.credentialContainers]}>
                        <Input placeholder="Location - Ex : douala/logpom" onChangeText={(text)=>{setLocation(text)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input, ]}
                            onFocus={() => setLocationFocused(true)}
                            onBlur={() => setLocationFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[userLoginStyles.inputContainer, locationFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='email' type='entypo' size={24} color={isEmailFocused?appColors.secondaryColor1:appColors.black} />
                                </Pressable>
                            }
                           
                            value={location}
                        /> 
                        {errors.location && <Text style={[formErrorStyle.text]}>{errors.location}</Text>}
                </View>

                <View style={{height:10}}></View>

                <View style={[userLoginStyles.credentialContainers]}>
                <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{setAdminPassword(pwd)}}
                        multiline={false}
                        numberOfLines={1}
                        placeholderTextColor={appColors.lightWhite}
                        inputStyle = {[userLoginStyles.input,]}
                        onFocus={() => setAdminPasswordFocused(true)}
                        onBlur={() => setAdminPasswordFocused(false)}
                        underlineColorAndroid='transparent'
                        inputContainerStyle={[{borderBottomWidth:1}, adminPasswordFocused && userLoginStyles.inputFocused,]}
                        leftIcon={ 
                            <Pressable onPress={() => {}}>
                                <Icon name='lock-closed-sharp' type='ionicon' size={24} color={adminPasswordFocused?appColors.secondaryColor1:appColors.black} />
                            </Pressable>
                        }
                        rightIcon = {
                            adminPasswordShowed ?
                                <Pressable onPress={()=>{setAdminPasswordShowed(false)}}>
                                    <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                </Pressable>
                            :
                            <Pressable onPress={()=>{setAdminPasswordShowed(true)}}>
                                    <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                        }
                        value={adminPassword}
                        secureTextEntry={!adminPasswordShowed}
                    /> 
                    {errors.password && <Text style={[formErrorStyle.text]}>{errors.password}</Text>} 
            </View>  
            </>
            }


            


                <Pressable style={[userLoginStyles.forgotBox]} onPress={() => { navigation.navigate('ResetPassword') } }>
                    <Text style={[customText.text, userLoginStyles.forgotText]}>Mot de passe oublié ?</Text>
                </Pressable>    
                
                              
    
    

                </ScrollView>
</KeyboardAwareScrollView>
        

            <CustomButton text="Valider" onPress={()=>{credentialType==='login' ? loginUser(email, username, password) :  signUpUser(email, username, password);}} color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
                     

        <CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message="Vérification des donnéees..." />

</View>
    )
/*}else{
    navigation.navigate("Preferences", {user:user})
}*/
}


export default UserLogin


