import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appColors, customText, appFont, formErrorStyle } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton, CustomModalActivityIndicator } from '../common/CommonSimpleComponents';
import { UserContext } from '../../context/UserContext';
import { getFirebaseErrorMessage } from '../../utils/commonAppFonctions'

import auth from '@react-native-firebase/auth';

import userValidationSchema from '../forms/validations/userValidation';
import * as Yup from 'yup';
import { storeCache } from '../../cache/cacheFunctions';

const ResetPassword = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, getUser, updateUser, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPassword1Focused, setIsPassword1Focused] = useState(false)
    const [isPassword2Focused, setIsPassword2Focused] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)


    const [isPassword1Showed, setIsPassword1Showed] = useState(false)
    const [isPassword2Showed, setIsPassword2Showed] = useState(false)
    

    const [isEmailCorrect, setIsEmailCorrect] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState("")
    const [isUsernameCorrect, setIsUsernameCorrect] = useState("")

    const [emailExists, setEmailExists] = useState(false)
    const [errors, setErrors] = useState({});


    const  resetUserPassword = async (email) => {
    try
    {
        setIsLoading(true)
        setErrors({});
        
           const userExists = await getUser(email)
            if(!userExists)
            {
                //return; if not exists
                Alert.alert('Error', 'Email non trouvée')
            }
        
        
        const formData = new FormData()
        //On met u mot de passe temporaire au genere aleatoirement
        formData.append('password', Math.random()*10000)
        const newUser = await updateUser(email, formData);
        if(!newUser)
        {
            const error = new Error('Utilisateur non trouvé');
            error.code = 'auth/user-not-found';
            throw error;
        }
        await auth().sendPasswordResetEmail(email);
/*
        const form = {email:email}
        //console.log(form)
        //await userValidationSchema.validate(form, { abortEarly: false });
    
        const formData = new FormData()
        //password

        if (password1 !== password2) 
        {
            throw new Error('Vos 2 mots de passe ne correspondent pas.');
        }
        
        formData.append('password', password1);
        const newUser = await updateUser(email, formData);
          //console.log(newUser)
        storeCache('user', {email:newUser.email, username:newUser.username, password:newUser.password})
        */
        //FIREBASE

          //Rediriger ver UserLogin

          Alert.alert(
            "Password reset",
            "Vous allez recevoir un email pour enregistrer votre nouveau mot de passe. Si vous ne le trouvez pas, regardez vos spams.",
            [
              
              {
                text: "OK", 
                onPress: () => navigation.navigate('UserLogin'),
              },
             
            ],
            { cancelable: true }
          );
    }
    catch(error)
    {
       /* if(password1 !== password2)
        {
            Alert.alert("Error", "Vos 2 mots de passe ne correspondent pas.")
        }*/

        if (error instanceof Yup.ValidationError) 
        {
            const formErrors = {};
            error.inner.forEach(err => {
                formErrors[err.path] = err.message;
            });
                console.log(formErrors)
            setErrors(formErrors);
        }
        else
        {
            if(error.code)
            {
                Alert.alert("Erreur", getFirebaseErrorMessage(error.code))
                return;
            }
            Alert.alert("Error", "Une erreur est sruvenue lors de la verificaiton de vos informations. Vérifiez les données fournies.")
        }
        console.log(error)
    }finally {
        setIsLoading(false)
    }
}

    return(
        <View style={[{flex:1}]}>
             <View style={[userLoginStyles.infoContainer]}>
                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Email" onChangeText={(text)=>{setEmail(text)}}
                            multiline={false}
                            readOnly={emailExists}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input, ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[userLoginStyles.inputContainer,isEmailFocused && userLoginStyles.inputFocused,]}
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
{ emailExists &&
        <View>
              
              <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{setPassword1(pwd)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsPassword1Focused(true)}
                            onBlur={() => setIsPassword1Focused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isPassword1Focused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='key-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon = {
                                isPassword1Showed ?
                                    <Pressable onPress={()=>{setIsPassword1Showed(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsPassword1Showed(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                            value={password1}
                            secureTextEntry={!isPassword1Showed}
                        />   
                </View>


                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{setPassword2(pwd)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsPassword2Focused(true)}
                            onBlur={() => setIsPassword2Focused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isPassword2Focused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='key-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon = {
                                isPassword2Showed ?
                                    <Pressable onPress={()=>{setIsPassword2Showed(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsPassword2Showed(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                            value={password2}
                            secureTextEntry={!isPassword2Showed}
                        />   
                      {errors.password && <Text style={[formErrorStyle.text]}>{errors.password}</Text>}
                </View> 
        </View>
}
                <View style={{height:6}}></View>
                    <CustomButton text="Valider" onPress={()=>{resetUserPassword(email)}} color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
                
                   
                
                </View>
                    

                <CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message="Envoie de l'email de reinitialisation en cours..." />


        </View>
    )
}

/*
 <View>
                          {errors.password && <Text style={[formErrorStyle.text]}>{errors.password}</Text>}
                          {errors.email && <Text style={[formErrorStyle.text]}>{errors.email}</Text>}
                    </View>
*/

export default ResetPassword


