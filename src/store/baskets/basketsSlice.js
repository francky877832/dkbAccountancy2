// basketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BACKEND } from '@env';
import { server } from '../../remote/server';
import { addModifiedProduct } from '../favourites/favouritesSlice'; // Importer l'action
import { useDispatch } from 'react-redux';
import { startTransition } from 'react';
import { choosePrice } from '../../utils/commonAppFonctions'

// Initial state
const initialState = {
  basket: [],
  selectedProducts: {},
  selectedSeller: [],
  totalPrice: 0,
  isLoading: false,
  quantities : {},
  basketNotifications : {}
};

// Thunks
export const fetchUserBasket = createAsyncThunk(
    'basket/fetchUserBasket',
    async (userId, { rejectWithValue }) => {
        
      try {
        const response = await fetch(`${server}/api/datas/basket/get/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch basket');
        }
        const data = await response.json();

        //console.log(data)

        return data?.productDetails?.length>0?data.productDetails:[];
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async ({product, user}, { rejectWithValue }) => {
      //console.log(product)
     // console.log(user)
        const basket = {
            user : user._id,
            username : user.username,
            product : product._id,
        }
      try {
        const response = await fetch(`${server}/api/datas/basket/update/${user._id}`, {
          method: 'POST',
          body: JSON.stringify(basket),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error('Failed to add to basket');
        }
  
        //return item;
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );


  
  // Async thunk for removing from basket
  export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async ({product, user}, { rejectWithValue }) => {
        const basket = {
            user : user._id,
            username : user.username,
            product : product._id,
        }
      try {
        const response = await fetch(`${server}/api/datas/basket/remove/${user._id}`, {
          method: 'PUT',
          body: JSON.stringify(basket),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error('Failed to remove from basket');
        }
  
        //return item._id;
        //console.error("error")
      } catch (error) {
        console.error(error)
        return rejectWithValue(error.message);
      }
    }
  );


  export const updateLocalBasket = createAsyncThunk(
    'basket/updateLocalBasket',
    async ({product, isAdding}, { dispatch, getState }) => {
      const { basket } = getState();
      
      let updatedProduct = {}
      // Mettre à jour le panier
      if(isAdding)
      {
        updatedProduct = {
          ...product,
          inBasket : product.inBasket+1,
        };
      }
      else
      {
        updatedProduct = {
          ...product,
          inBasket : product.inBasket-1,
        };
      }
      //console.log(updatedProduct._id)
      //console.log("ok")
      
      dispatch(addOrRemoveLocalBasket({product, isAdding}));
      //console.log("ok")
      dispatch(addModifiedProduct(updatedProduct));
    }
  );


// Slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    updateBasketNotifications: (state, action) => {
      const { name, id } = action.payload;

      const updatedBasketNotifications = {
        ...state.basketNotifications,
        name :  [...state.basketNotifications[name].push(id)]
      }

      state.basketNotifications = updatedBasketNotifications
    },

    updateSelectedProducts: (state, action) => {
      //console.log(action.payload)
      const { product, bool } = action.payload;
      
      
      const updatedSelectedProducts = {
        ...state.selectedProducts,
        [product._id]: bool ? !state.selectedProducts[product._id] : false // bool !== 'remove' ? !state.selectedProducts[itemId] : false,
      };
      //console.log(state.selectedProducts)
      state.selectedProducts = updatedSelectedProducts;
      let total=0
      Object.keys(updatedSelectedProducts).forEach(key => {
          const isSelected = updatedSelectedProducts[key];
          const item = state.basket.find((product) => product._id === key);
          if(isSelected && item)
          {
            total +=  choosePrice(item)* ((state.selectedProducts[item._id]&&state.quantities[item._id]) || 1)
          }
          else
          {
            total += 0
          }

      })
      state.totalPrice = total
      /*reduce((total, key) => {
       
        //const item = state.basket.find((product) => product._id === key);
        return isSelected ? total + (choosePrice(product) || 0) : 0;
      }, 0);*/
    },
    setSelectedSeller: (state, action) => {
      const { seller } = action.payload;
      let sellers = []

        if (state.selectedSeller.includes(seller)) {
          sellers = state.selectedSeller.filter(id => id != seller);
        } else {
          sellers = [...state.selectedSeller, seller];
        }
        //console.log(sellers, seller)
        state.selectedSeller = [...sellers]
    },

    addOrRemoveLocalBasket(state, action) {
        const { product, isAdding } = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === product._id);
        //console.log("ok")
        if (isAdding) {
          if (existingIndex === -1) {
            if (!state.basket.some(item => item._id === product._id)) {
              const updatedProduct = {
                ...product,
                inBasket : product.inBasket+1,
              };
      
              state.basket.push(updatedProduct);
              //console.log(product.likes)
            }
          }
        } else {
          if (existingIndex !== -1) {
            
            const updatedProduct = {
              ...product,
              inBasket : product.inBasket-1,
            };
      
            //state.basket = state.basket.filter(item => item._id !== product._id);
            state.basket.splice(existingIndex, 1);
          }
        }
      },

      addLocalBasket(state, action) {
        //state.dispatch(addModifiedProducts(updatedModifiedProducts));

        const product = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === product._id);
  
        if (existingIndex === -1) {
          state.basket.unshift(item);
        }

        

      },
      
      removeLocalBasket(state, action) {
        const itemId = action.payload;
        const existingIndex = state.basket.findIndex(basketItem => basketItem._id === itemId);
  
        if (existingIndex !== -1) {
          state.basket.splice(existingIndex, 1);
        }
      },
      updateQuantities(state, action) {
        const { id, quantity } = action.payload
        //console.log(action.payload)
        state.quantities = {...state.quantities, [id]:quantity}
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBasket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserBasket.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addToBasket.pending, (state) => {
        state.isLoading = true; // eviter un render pour eviter product.likes+2
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.isLoading = false; // eviter un render pour eviter product.likes-2
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      })
      .addCase(removeFromBasket.pending, (state) => {
        state.isLoading = true; // eviter un render pour eviter product.likes+2
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.isLoading = false; // eviter un render pour eviter product.likes-2
      })
      .addCase(removeFromBasket.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      });
  },
});

export const isProductBasket = (state, productId) => {
    //console.log("BASKET")
    //console.log(productId)
    return state.basket.basket.some(product => product._id === productId);
  };


// Selectors
export const selectBasket = (state) => state.basket.basket;
export const selectIsLoading = (state) => state.basket.status;
export const selectError = (state) => state.basket.error;
export const selectSelectedProducts = (state) => state.basket.selectedProducts;
export const selectSelectedSeller = (state) => state.basket.selectedSeller;
export const selectTotalPrice = (state) => state.basket.totalPrice;

export const { updateSelectedProducts, setSelectedSeller, addOrRemoveLocalBasket, updateQuantities } = basketSlice.actions;
export default basketSlice.reducer;
