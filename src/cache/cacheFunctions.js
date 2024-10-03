import Cache from 'react-native-cache';
import * as SecureStore from 'expo-secure-store';

//import AsyncStorage from '@react-native-async-storage/async-storage';

  /*
    await AsyncStorage.setItem(key, jsonValue);
    const jsonValue = await AsyncStorage.getItem(key);
  */
export const storeCache = async (key, value) => {
    //console.log(value)
    if(value)
    {
        try {
        const jsonValue = JSON.stringify(value);
        //console.log(value)
        await SecureStore.setItemAsync(key, jsonValue);
        } catch (error) {
        console.log(error)
        }
    }
};

  export const getCache = async (key) => {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      console.log("jsonValue")
      //console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error)
    }
  };