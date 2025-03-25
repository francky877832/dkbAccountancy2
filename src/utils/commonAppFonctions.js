import nlp from "compromise";
const Fuse = require('fuse.js');
import { Linking, Share, Alert, Platform} from 'react-native';

 

export const handleSharePress = async (link) => {
    if (!link) {
        console.error("Lien manquant pour le partage");
        return false;
    }
    try {
        await Share.share({
            message: link
        });
        return true
    } catch (error) {
        console.error('Erreur lors du partage :', error);
        return false
    }
}


export const capitalizeFirstLetter = str => str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
export const debouncer = (callback, time) => {
    let timeoutId;
  
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        callback(...args);
        //console.log("debouning")
      }, time);
    };
  };




export const openWhatsApp = async (phoneNumber, message) => {
 // const url = `https://wa.me/${phoneNumber}` //?text=${encodeURIComponent(message)}`;

  const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
  const fallbackUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  try {
    // Check if WhatsApp can be opened
    await Linking.openURL(url);
  } catch (err) {
    // If WhatsApp is not installed, open the fallback URL
    await Linking.openURL(fallbackUrl);
  }

}

export const whatsappMessage = (buyer, seller, status, orderNo, group, product) => {
    return `Buyer : ${buyer}\nSeller : ${seller}\nStatus: ${status}\nOrder No: ${orderNo}\nGroup: ${group}\nProduct: JW-PROD-${product}`
}




export const sinceDate = (_date) => {
    const date2 = new Date(_date)
    const date1 = new Date()
    const date = date1.getTime() - date2.getTime()
    //console.log(date1)
    //console.log(Date.now() + " - " + date2.getTime() + " = " + date)
    let oneDay = 1000 * 60 * 60 * 24

    let years = Math.floor(date/(oneDay*365))
    let months = Math.floor(date/(oneDay*30))
    let weeks = Math.floor(date/(oneDay*7))
    let days = Math.floor(date/oneDay)
    let hours = Math.floor(date/(oneDay/24))
    let minutes = Math.floor(date/(oneDay/(24*60)))
    let seconds = Math.floor(date/(oneDay/60*60*24))

    
    if(years != 0)
        return [isNaN(years)?0:years, years==1 ? "an" : "ans"]
    else if(months != 0)
        return [isNaN(months)?0:months, "mois"]
    else if(weeks != 0)
        return [isNaN(weeks)?0:weeks, weeks==1 ? "semaine" : "semaines"]
    else if(days != 0)
        return [isNaN(days)?0:days, days==1 ? "jour" : "jours"]
    else if(hours != 0)
        return [isNaN(hours)?0:hours, hours==1 ? "heure" : "heures"]
    else if(minutes != 0)
        return [isNaN(minutes)?0:minutes, minutes==1 ? "minute" : "minutes"]
    else
        return [isNaN(seconds)?0:seconds, (seconds==1 || seconds==0) ? "seconde" : "secondes"]

}

export const truncateText = (text, numChars, clicked=false) => {
    if(text?.length > numChars)
        return [text?.substring(0, numChars+1), 1, clicked]
    else
        return [text?.substring(0, numChars+1), 0, clicked]
}

export const truncateTextAndAddDots = (text, numChars, clicked=false) => {
    const data = truncateText(text, numChars, clicked)
    return data[0] + (data[1] === 1 ? "..." : "")
}

export  const displayComment = (comments) => {
    
    return true
}

export  const reshapeComments = (datas) => {
    let comments = [...datas]
    let newComments = []
    for(let i in comments)
    {
        let subComment = []
        let j = i
        for( j in comments)
        {
            if(i != j)
            {
                if(comments[i] != undefined && comments[j] != undefined)
                {
                    if(comments[i]._id == comments[j].isResponseTo)
                    {
                        subComment.push(comments[j])
                        comments[i] = {...comments[i], subComment : subComment}
                        //comments.splice(j, 1)
                        delete comments[j]
                    }
                }
            }
        }
       // console.log(i)     
    }
    for(let j in comments)
        if(comments[j] != undefined)
            newComments.push(comments[j])
    return newComments;
}


export  const formatMoney = (m) => {
    m = m || ""
    let money = [];
    let money_separator = '.'
    let m_tmp = m.toString().split('')
    let money_reverse = []
    for(let j=m_tmp.length-1;j>=0;j--)
    {
        if(m_tmp[j] != money_separator)
        {
            money_reverse.push(m_tmp[j])
        }
    }
    for(let i in money_reverse)
    {
            if(money_reverse[i] != money_separator)
            {
                money.push(money_reverse[i])
            }
        if((i+1)%3 == 0 && i != money_reverse.length-1)
        {
            money.push(money_separator)
        }
    }
    return money.reverse().join('')
}


export  const countDatas = (datas) => {
    let count = 0

    for(let i of datas)
    {
        count += 1;
        if(Array.isArray(i))
        {
            count += i.length;
        }
    }
    return count;
}


export  const reshapeBasketProducts = (p) => {
    const products = [...p]

}



export const serialize = (obj, prefix) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];
        if (v !== null && typeof v === 'object') {
          str.push(serialize(v, k));
        } else {
          str.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
      }
    }
    
    //console.log(queryString)
    //const params = new URLSearchParams(obj);
    //const queryString = params.toString();
    return str.join("&");
  }
//export  const serialize = serialize


// Fonction pour transformer les nombres écrits en lettres en chiffres dans un texte
export  const convertWordsToNumbers = (text) => {
    // Utilisation de Compromise.js pour analyser le texte
        const comment = new String(text);
        //console.log(doc)
    // Regex pour détecter les nombres écrits en mots
    const numberRegex = /(?:\b(?:zero|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|dix[\s\-](?:sept|huit|neuf))\b|\b(?:vingt(?:\-et\-un)?|trente|quarante|cinquante|soixante(?:\-dix)?|quatre\-vingt(?:\-dix)?|cent(?:\s(?:un|et\sun))?|mille|million|milliard)\b)/gi;

    // Fonction pour convertir les mots en chiffres
    function convertWords(match) {
        switch (match.toLowerCase()) {
            case 'zero':
                return '0';
            case 'un':
                return '1';
            case 'deux':
                return '2';
            case 'trois':
                return '3';
            case 'quatre':
                return '4';
            case 'cinq':
                return '5';
            case 'six':
                return '6';
            case 'sept':
                return '7';
            case 'huit':
                return '8';
            case 'neuf':
                return '9';
            case 'dix':
                return '10';
            case 'onze':
                return '11';
            case 'douze':
                return '12';
            case 'treize':
                return '13';
            case 'quatorze':
                return '14';
            case 'quinze':
                return '15';
            case 'seize':
                return '16';
            case 'vingt':
                return '20';
            case 'trente':
                return '30';
            case 'quarante':
                return '40';
            case 'cinquante':
                return '50';
            case 'soixante':
                return '60';
            case 'quatre-vingt':
                return '80';
            case 'cent':
                return '100';
            case 'mille':
                return '1000';
            case 'million':
                return '1000000';
            case 'milliard':
                return '1000000000';
            default:
                return match;
        }
    }

    // Remplacer chaque mot correspondant à la regex par sa version convertie
    const replacedText = comment.replace(numberRegex, convertWords);
    //console.log(replacedText)

    function findNumbers(input) {
        const text = input.replace(/[^a-zA-Z0-9]/g, '');
        console.log(text)
        const longNumberRegex = /\d{8,}/g;
        const matches = text.match(longNumberRegex);
//console.log(matches)
        if (matches) {
            //console.log("Plus de 7")
            return false;
        } else {
            return true;
        }
    }
    
    //const inputString = "123-456789/123456 78abc123 1234567";
    const result = findNumbers(replacedText);
    
    //console.log("Nombres trouvés:", result.numbers);
    /*if (result.errors.length > 0) {
        console.error("Erreurs:", result.errors.join(', '));
    }*/

    return result; // Retourner le texte avec les nombres convertis
}

export  const containsEmail = (text) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailRegex.test(text);
    //return text
}




export  const getSearchedProducts = async (filters, products) => {
    const { name, customFilters } = filters;
    let result;
        if(!name)
        {
          result = products
          //console.log("vide")
        }
        else
        {
          const fuse = new Fuse(products, {
          keys: ['name', 'description', 'category'],
          threshold: 0.5, // Ajustez ce seuil selon vos besoins
          });
    
          // Effectuer la recherche floue
          result = fuse.search(name).map(result => result.item);
    
          //comme FUSE JS ne conserve pas l'ordre, utiliser la memoire de tri
            result.sort((a, b) => a.sortIndex - b.sortIndex);
        }
        //console.log(result)
        
        // Appliquer des filtres personnalisés si nécessaire
        let filteredResult = result;
        //console.log(customFilters.minPrice)
        if (customFilters.categories?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.categories.includes(product.category));
        }
        if (customFilters.brands?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.brands.includes(product.brand));
        }
        if (customFilters.condition?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.condition.includes(product.condition));
        }
        if (customFilters.minPrice) {
          filteredResult = filteredResult.filter(product => customFilters.minPrice <= product.price);
        }
        if (customFilters.maxPrice) {
          filteredResult = filteredResult.filter(product => customFilters.maxPrice >= product.price);
        }
    
        return filteredResult
}

export const checkOfferPrice = (realPrice, offerPrice)=>
{
    if(offerPrice < (realPrice*50/100) || offerPrice >= realPrice)
    {
        return "price-boundries-off"
    }
}


export const formatDateToLitteral = (dateString) =>  {
    const mois = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    const date = new Date(dateString);
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();

    return `${jour} ${capitalizeFirstLetter(mois[date.getMonth()])} ${annee}`;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}H${minutes}`;
    //return new Date(dateString).toLocaleString()
};



export const convertISOToCustomDateFormat = (isoDateString) => {
    const date = new Date(isoDateString);

    // Extraire le jour, le mois et l'année
    const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro au début si nécessaire
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const pluralize = (nombre, nom) => {
    if (typeof nombre !== 'number') {
        throw new Error('Le premier argument doit être un nombre.');
    }
    
    const exceptions = {
        "oeil": "yeux",
        "ciel": "cieux",
        "monsieur": "messieurs",
        "madame": "mesdames",
        "mademoiselle": "mesdemoiselles",
    };

    // Si le mot fait partie des exceptions
    if (exceptions[nom]) {
        return nombre > 1 ? exceptions[nom] : nom;
    }

    // Règle générale : ajouter 's' au pluriel
    if (nombre > 1) {
        // Mots en 'al' deviennent 'aux'
        if (nom.endsWith('al') && !nom.endsWith('bal') && !nom.endsWith('carnaval')) {
            return nom.slice(0, -2) + 'aux';
        }

        // Mots en 'eau', 'eu' prennent un 'x'
        if (nom.endsWith('eau') || nom.endsWith('eu')) {
            return nom + 'x';
        }

        // Sinon ajouter un 's'
        return nom + 's';
    }

    // Retourne au singulier
    return nom;
}


export const formatLikes = (likes) => {
    if (likes < 1000) {
      return likes.toString(); // Affiche directement si moins de 1000 likes
    } else if (likes >= 1000 && likes < 1000000) {
      return (likes / 1000).toFixed(likes % 1000 === 0 ? 0 : 1) + 'K'; // Affiche en "K"
    } else {
      return (likes / 1000000).toFixed(likes % 1000000 === 0 ? 0 : 1) + 'M'; // Affiche en "M"
    }
  }
  

//ORDERS

export  const formatPhoneNumber = (phone) => {
    return phone
}

export  const deFormatPhoneNumber = (phone) => {
    return phone
}


export  const generateOrderNo = (prefixe = "CMD") => {
    const date = new Date();
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const jour = String(date.getDate()).padStart(2, '0');

    const nombreAleatoire = Math.floor(1000 + Math.random() * 9000); 
    const codeCommande = `${prefixe}-${annee}${mois}${jour}-${nombreAleatoire}`;
    return codeCommande;
}
export const choosePrice = (product) => {
    if(product.hasOwnProperty('offers') && Object.keys(product.offers)?.length>0 && product.offers?.offers?.length>0 && product.offers?.offers?.at(-1)?.hasGotResponse==1 )
    {
        return product.offers?.offers?.at(-1)?.price
    }
    return product.newPrice
}

//export  const choosePrice = choosePrice

export  const hasPropositionPrice = (product) => {
    //console.log(product)
    return product.hasOwnProperty('offers') && Object.keys(product?.offers)?.length>0 && product?.offers?.offers?.length>0 && product?.offers?.offers?.at(-1)?.hasGotResponse==1
}

export const calculateTotalPrice = (products) => {
    const totalPrice = products.reduce((total, product) =>{
        const priceToPay = choosePrice(product)
        return total+parseInt(priceToPay)*(product.orderQuantity||1)
    }, 0)
    return totalPrice
}
//export  const calculateTotalPrice = calculateTotalPrice


export  const formDataToJSON = (formData) => {
    const jsonObject = {};
    console.log("   FORM DATAS")
    console.log(formData)
    if (formData instanceof FormData) {
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
    } else {
      throw new Error('Provided data is not an instance of FormData');
    }
    
    return JSON.stringify(jsonObject);
  }

export  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return "L'adresse e-mail est invalide.";
      case 'auth/user-disabled':
        return "Ce compte a été désactivé.";
      case 'auth/user-not-found':
        return "Aucun utilisateur trouvé avec cette adresse e-mail.";
      case 'auth/wrong-password':
        return "Le mot de passe est incorrect.";
      case 'auth/too-many-requests':
        return "Trop de tentatives de connexion. Réessayez plus tard.  Si vous ne voulez pas attendre réinitialisez votre mot de passe.";
      default:
        return "Une erreur inconnue s'est produite. Veuillez réessayer.";
    }
};

export const getDate = () => {
    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear(); // 4 chiffres

    return `${day}-${month}-${year}`;
};


export  const isValidDate = (date) => {

    return date.split('-').length === 3
}

import Swal from 'sweetalert2';

export const showAlert = (datas) => {
    if (Platform.OS === 'web') {
      Swal.fire({
        title: datas.title,
        text: datas.text,
        icon: datas.icon, //warning
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
            datas.action()
        } else {
            //console.log(typeof datas.refuseAction=='function')
            typeof datas.refuseAction=='function' ? datas.refuseAction() : datas.action()
        }
      });
    } else {
        Alert.alert(
            datas.title, 
            datas.text,
            [
                {
                    text: 'Yes',
                    onPress: () => null,
                    style: 'cancel',
                },
              {
                text: "Ok",
                onPress: () => datas.action()
              },
            ],
            { cancelable: false } 
          );
    }
  };



