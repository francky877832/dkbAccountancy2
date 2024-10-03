import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as SecureStore from 'expo-secure-store';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton, CustomModalActivityIndicator } from '../common/CommonSimpleComponents';

import { server } from '../../remote/server';
import { serialize } from '../../utils/commonAppFonctions'
import { UserContext } from '../../context/UserContext';



const LoaderPage = (props) => {

    const route = useRoute()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const {checkEmail, checkPassword, checkUsername, user, setUser, isAuthenticated, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)
    useEffect(() => {
        const checkToken = async () => {
            //await SecureStore.deleteItemAsync('user');
            //await SecureStore.deleteItemAsync('authToken');
    //console.log("oj")
            try{
                setIsLoading(true)
                const token = await SecureStore.getItemAsync('authToken');
                
                if(!!token)
                {
                    const user = JSON.parse(await SecureStore.getItemAsync('user'));
                    //console.log(typeof user)
                    //A remplace par user.email...
                    ///await loginUserWithEmailAndPassword("francky877832@gmail.com", "francky877832", "0000000")
                    loginUserWithEmailAndPassword(user.email, user.username, user.password).then(async (user)=>{
                        //Chargement des données de l'Appli
                        if(!user)
                        {   
                            throw new Error("Nous n'avons pas pu vous connecter automatiquement.")
                        }
                        navigation.replace('Home');

                        return;
                    }).catch((error) => {
                        console.log("TOKEN")
                        navigation.replace('UserLogin');
                        return;
                    })
                    
                    //setIsAuthenticated(true);

                    return;
                }
                else
                {
                    navigation.replace('UserLogin');
                }
            }
            catch(error)
            {
                console.log(error)
                console.log("NOT TOKEN")
                navigation.replace('UserLogin');
                setIsAuthenticated(false);
                setIsLoading(false)
            }finally{
                
            }
        }

        checkToken();
/*
        if (isAuthenticated) {
            // Naviguer vers une autre page si l'utilisateur est authentifié
              navigation.replace('Preferences');
        }
        else
        {
            navigation.replace('UserLogin');
        }
*/
    }, []);

    useEffect(() => {
       
      }, [isAuthenticated, navigation]);
    
      return (
        <View style={[loaderPageStyles.container]}>
            <CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />
        </View>
      )
}


/*
 <LottieView
                source={require('../../assets/animations/loaderPage1.json')}
                autoPlay
                loop
                style={[loaderPageStyles.animation]}
            />
    */
export default LoaderPage


const loaderPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 100,
        height: 100,
    },
})