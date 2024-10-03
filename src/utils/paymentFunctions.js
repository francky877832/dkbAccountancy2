
export const campay_credentials = {
    username : 'gUlsaUYwHocFnmQ-n170AvJukmUGTI3kz9Rp5iJ6JJwc2i1y1GbxunuRc1R8wKJ1jivAQglnrJ9iMQwd2ywg7g',
    password : 'DxTUONrdunXt3VgDc8PJDebUNN98uzaGA0EZVQ8R4yq8RohKevGz9-ygZpVDm0EZPJfn5nAgpPK7Q96xNFYiQw',
    token : 'df3cf609a205201427e083abd4b77482067cd04d'
}
export const getAuthToken = async (username, password) => {
    try {
      const response = await fetch('https://demo.campay.net/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok || !data.token) {
        throw new Error(data)
       } 
        return data;
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'obtention du jeton.', error);
      return {error:error}
    }
  };


  
export const completeTransaction = async (authToken, details ) => {

    try {
      const response = await fetch('https://demo.campay.net/api/collect/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
        redirect: 'follow'
      });

      const data = await response.json();

      if (!response.ok) {
       throw new Error(data)
      } 
      return data
    } catch (error) {
      console.error(error);
      return {error:error}
    }
  };