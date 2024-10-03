import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../remote/server';
import { useCallback } from 'react';
import { sendNotifications } from '../../utils/commonAppNetworkFunctions' 
// slices/favouritesSlice.js

const loggedUser = "Francky";
const loggedUserId = "66715deae5f65636347e7f9e";

// Thunks asynchrones

// Equivalent de la fonction `addFavourite` dans FavouritesContext
export const addFavourite = createAsyncThunk(
  'favourites/addFavourite',
  async ({ item, bool, user }, { rejectWithValue }) => {
    try {
      let response = {};
      const favourite = {
        user: user._id,
        username: user.username,
        product: item._id,
      };

      if (bool) {
          response = await fetch(`${server}/api/datas/favourites/update/${user._id}`, {
              method: 'POST',
              body: JSON.stringify(favourite),
              headers: { 'Content-Type': 'application/json' },
          });

          response = await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
              method: 'PUT',
              body: JSON.stringify({ updateLikes: 1, userId:user._id }),
              headers: { 'Content-Type': 'application/json' },
          });

          //console.log(item.seller)
          //'tem/favour'tes cont'ent les produ'ts brutes de la BDD differencts de ceux de ModifiedProducts
          if(!item.favourites.some(el => el._id===user._id))
          {
              await sendNotifications({ user:item.seller._id, source:"app", model:"PRODUCTS", type:"ON_NEW_LIKE", datas:item._id })
          }
        
          

      } else {
          response = await fetch(`${server}/api/datas/favourites/remove/${user._id}`, {
              method: 'PUT',
              body: JSON.stringify(favourite),
              headers: { 'Content-Type': 'application/json' },
          });

          response = await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
              method: 'PUT',
              body: JSON.stringify({ updateLikes: -1, userId:user._id }),
              headers: { 'Content-Type': 'application/json' },
          });
      }

      if (!response.ok) {
        throw new Error('Erreur lors de la requête addFavourite');
      }

      //return { item, bool };
    } catch (error) {
        console.error(error)
      return rejectWithValue(error.message);
    }
  }
);

// Equivalent de la fonction `fetchUserFavourites` dans FavouritesContext
export const fetchUserFavourites = createAsyncThunk(
  'favourites/fetchUserFavourites',
  async ({ user, page }, { getState, rejectWithValue }) => {
    //console.log("page")
    //console.log(user)
    try {
      const response = await fetch(`${server}/api/datas/favourites/get/${user}?page=${page}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la requête Fetch favourite'+await response.text());
      }
      return await response.json();
    } catch (error) {
        console.error(error)
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [], // Equivalent de `const [favourites, setFavourites] = useState([])`
    liked: null, // Equivalent de `const [liked, setLikedIcon] = useState()`
    isLoading: false, // Equivalent de `const [isLoading, setIsLoading] = useState(false)`
    disableLikeButton: false, // Equivalent de `const [disableLikeButton, setDisableLikeButton] = useState(false)`
    hasMore: true, // Equivalent de `const [hasMore, setHasMore] = useState(true)`
    page: 1, // Equivalent de `const [page, setPage] = useState(1)`
    error: null,
    addLike : 0,
    modifiedProducts : [],
  },
  reducers: {
    addLocalFavourite(state, action) {
        //console.log(action.payload)
      const {product, user} = action.payload;
      //console.log(user)
      if (!state.favourites.some(item => item._id === product._id)) {
        const updatedProduct = {
          ...product,
          likes : product.likes+1,
          favourites: [user, ...product.favourites]
        };

        state.favourites.unshift(updatedProduct);
        state.modifiedProducts.unshift(updatedProduct);
        //console.log(product.likes)
      }
      //console.log(state.favourites)
      state.addLike = state.addLike+1
    },
    // Méthode pour supprimer un produit de la liste des favoris (exemple)
    removeLocalFavourite(state, action) {
      const {product, user} = action.payload;

      const updatedProduct = {
        ...product,
        likes : product.likes-1,
        favourites: product.favourites.filter(item => item._id !== user._id)
      };

      const fav = state.favourites.filter(item => item._id !== product._id);
      const mp = state.modifiedProducts.map(item => {
          if (item._id === product._id) {
            return updatedProduct 
          }
            return item
        })
        
        state.favourites = fav
        state.modifiedProducts = mp
        state.addLike = state.addLike-1
    },
    addModifiedProduct(state, action) {
      //console.log("addModifiedProduct")
      const product = action.payload
      const isModifiedProduct = state.modifiedProducts.some(item => item._id === product._id);
      if(isModifiedProduct)
      {
        const mp = state.modifiedProducts.map(item => {
          if (item._id === product._id) {
            return product 
          }
          return item
        })

        state.modifiedProducts = mp
      }
      else
      {
        const updatedProducts = [product, state.modifiedProducts]
        state.modifiedProducts = updatedProducts
      }
      //state.favourites = state.modifiedProducts
    },
    setLikedIcon(state, action) {
      state.liked = action.payload; // Equivalent de `setLikedIcon`
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload; // Equivalent de `setIsLoading`
    },
    setDisableLikeButton(state, action) {
      state.disableLikeButton = action.payload; // Equivalent de `setDisableLikeButton`
    },
    setPage(state, action) {
      state.page = action.payload; // Equivalent de `setPage`
    },
    setHasMore(state, action) {
      state.hasMore = action.payload; // Equivalent de `setHasMore`
    },
    addFavouriteContext(state, action) {
      const { item, bool } = action.payload;
      //console.log(item)
      const favouriteIds = new Set(state.favourites.map(fav => fav._id));
      const isPresent = favouriteIds.has(item._id);

      if (bool && !isPresent) {
        state.favourites = [item, ...state.favourites];
      } else if (!bool && isPresent) {
        state.favourites = state.favourites.filter(fav => fav._id !== item._id);
      }
    },
    updateLocalFavourites(state, action) {
        const { item, isAdding } = action.payload;
        const existingIndex = state.favourites.findIndex(fav => fav._id === item._id);
  
        if (isAdding) {
          if (existingIndex === -1) {
            state.favourites.push(item);
          }
        } else {
          if (existingIndex !== -1) {
            state.favourites.splice(existingIndex, 1);
          }
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavourite.pending, (state) => {
        state.isLoading = true; // eviter un render pour eviter product.likes+2
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.isLoading = false; // eviter un render pour eviter product.likes-2
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      })
      .addCase(fetchUserFavourites.pending, (state) => {
        state.isLoading = true; // Equivalent de `setIsLoading(true)`
      })
      .addCase(fetchUserFavourites.fulfilled, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        const products = action.payload.datas;
        if (products.length > 0) {
          state.favourites = [...state.favourites, ...products[0].productDetails]; // Equivalent de `setFavourites([...prevProducts, ...products[0].productDetails])`
          state.modifiedProducts = [...state.favourites, ...products[0].productDetails]; 
          state.page += 1; // Equivalent de `setPage((prevPage) => prevPage + 1)`
        } else {
          state.hasMore = false; // Equivalent de `setHasMore(false)`
        }
      })
      .addCase(fetchUserFavourites.rejected, (state, action) => {
        state.isLoading = false; // Equivalent de `setIsLoading(false)`
        state.error = action.payload; // Gestion des erreurs
      });
  },
});

export const isProductFavourite = (state, productId) => {
    return state.favourites.favourites.some(product => product._id === productId);
  };
  export const hasBeenModifiedProduct = (state, productId) => {
    return state.favourites.modifiedProducts.some(product => product._id === productId);
  };

export const { setLikedIcon, setIsLoading, setDisableLikeButton, setPage, setHasMore, addFavouriteContext, updateLocalFavourites,  addLocalFavourite, removeLocalFavourite, addModifiedProduct } = favouritesSlice.actions;

export default favouritesSlice.reducer;
