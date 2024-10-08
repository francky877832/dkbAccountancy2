import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { serialize, formDataToJSON } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { storeCache, getCache } from '../cache/cacheFunctions';

const AccountancyContext = createContext()
const AccountancyProvider = ({children}) => {

    const [accountancies, setAccountancies] = useState([])
    const [accounters, setAccounters] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchAccountancies = async (user) => {
        try
        {
            console.log(user)
            setIsLoading(true)
            const response = await fetch(`${server}/api/datas/accountancy/accountancies/${encodeURIComponent(user._id)}`, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                },
            })

            if(!response)
            {
                throw new Error("Erreur reseau " + await response.text())
            }
            
            const res = await response.json()
            //console.log(res.datas[0].user)
            setAccountancies(res.datas)
            return res.datas
        }
        catch(error)
        {
            console.log(error)
            return []
        }finally{
            setIsLoading(false)
        }

    }


    const getSearchedAccountancies = async (date) => {
        const datas = {
            date
        }

        try
        {
            setIsLoading(true)
            const response = await fetch(`${server}/api/datas/accountancy/accountancies/search?date=${encodeURIComponent(date)}`, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                },
            })

            if(!response)
            {
                throw new Error("Erreur reseau " + await response.text())
            }
            
            const res = await response.json()
            //console.log(res.datas[0].user)
            setAccountancies(res.datas)
            return res.datas
        }
        catch(error)
        {
            console.log(error)
            return []
        }finally{
            setIsLoading(false)
        }

    }

    
    const addUserDailyAccountancy = async (user, dailyReport) => {
        try {
            
            const response = await fetch(`${server}/api/datas/accountancy/add/${encodeURIComponent(user._id)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dailyReport), 
            });
    
            // Vérification si la requête a réussi
            if (!response.ok) {
                const errorData = await response.text();
               throw new Error(errorData);
            }
            //console.log(updatedFormData)
            
            const responseData = await response.json();

            return responseData.datas
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            return false
        }
    }


    const fetchAccounters = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${server}/api/datas/accountancy/accounters`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const err = await response.text()
                throw new Error(`Error: ${err}`);
            }
    
            const res = await response.json();
    
            if (!res.success) {
                console.error('Error fetching users:', res.message);
                return;
            }
    
            // Manipuler les données ici (liste des utilisateurs)
            //console.log(res)
            setAccounters(res.datas)
    
        } catch (error) {
            console.error('Fetch error:', error.message);
        }finally{
            setIsLoading(false)
        }
    };






    const filterStateVars = {accounters, accountancies, isLoading}
    const filterStateSetters = {setAccounters, setIsLoading}
    const utilsFunctions = {fetchAccountancies, getSearchedAccountancies, addUserDailyAccountancy, fetchAccounters}
    return (
        <AccountancyContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </AccountancyContext.Provider>
    )
}


export { AccountancyContext, AccountancyProvider }