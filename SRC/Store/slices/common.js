import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  cart: [],
  bookings: [],
  notification: false,
  order: [],
  sellerProducts: [],
  sellerService: [],
  selectedRole: '',
  category: [],
  location: '',
  pickupLocatin: {},
  dropoffLocation: {},
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setPickupLocation(state, action) {
      state.pickupLocatin = action.payload;
    },
    setDropoffLocation(state, action) {
      state.dropoffLocation = action.payload;
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
      console.log('🚀 ~ setUserLogOut ~ userData:', state.userData);
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },

    AddToCart(state, action) {
      const itemId = action.payload.id;
      console.log('🚀 ~ AddToCart ~ action.payload:', action.payload);

      state.cart.push({date: moment(), ...action.payload});
    },

    RemoveToCart(state, action) {
      const itemId = action.payload.id;
      state.cart = state.cart.filter((item, index) => item.id !== itemId);
    },

    EmptyCart(State, action) {
      State.cart = [];
    },

    Order(State, action) {
      State.order.push(action.payload);
    },

    increamentQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        itemAddCart.qty++;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        if (itemAddCart.qty >= 1) {
          itemAddCart.qty--;
        } else if (itemAddCart == 1) {
          state.cart = state.cart.filter(
            (item, index) => item.id !== action.payload.id,
          );
        }
      }
    },
    setColor(state, action) {
      console.log(action.payload);
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.selectedColor = action.payload.colors;
      }
    },
    setSize(state, action) {
      console.log(action.payload);
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.selectedSize = action.payload.size;
      }
    },
    setCotton(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.cotton += action.payload.val;
      }
    },
    setLiked(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.like = action.payload.liked;
      }
    },
    setServiceBooking(state, action) {
      console.log(
        '🚀 ~ file: common.js:116 ~ setServiceBooking ~ action:',
        action.payload,
      );
      state.bookings.push(action.payload);
    },

    setAddProducts(state, action) {
      console.log('Data===============>>=====', state.sellerProducts);
      console.log('Data===============>>', action.payload);

      // console.log('Dat==================>>>>>>>', {sellerId:action.payload.userId,id:state.sellerProducts.length+1, ...action.payload.item, })
      const item = state.sellerProducts.find(
        item => item?.id == action.payload.item.id,
      );
      if (item) {
        item.Category = action.payload.item?.Category;
        item.Title = action.payload.item.Title;
        item.colors = action.payload.item.colors;
        // item.id = action.payload.item.colors;
        item.images = action.payload.item.images;
        item.price = action.payload.item.price;
        // item.qty = action.payload.item.qty;
        item.size = action.payload.item.size;
        item.totalQty = action.payload.item.totalQty;
      } else {
        state.sellerProducts.push({
          sellerId: action.payload.userId,
          ...action.payload.item,
          id: state.sellerProducts.length + 1,
        });
      }
    },

    deleteProducts(state, action) {
      console.log(
        '🚀 ~ file: common.js:147 ~ deleteProducts ~ action:',
        action.payload,
      );

      console.log('Data===============>>=====', state.sellerProducts);
      state.sellerProducts = state.sellerProducts.filter(
        item => item.id != action.payload.id,
      );
    },

    setServices(state, action) {
      console.log(
        '🚀 ~ file: common.js:133 ~ setServices ~ state:',
        state.sellerService,
      );
      console.log(
        '🚀 ~ file: common.js:116 ~ setServiceBooking ~ action:',
        action.payload,
      );

      const item = state.sellerService.find(item => {
        // console.log(item?.serviceOwner.id, action.payload.id)
        return item.serviceOwner.id == action.payload.serviceOwner.id;
      });
      console.log('🚀 ~ file: common.js:137 ~ setServices ~ item:', item);
      if (item) {
        item.Title = action.payload.Title;
        item.category = action.payload.category;
        item.charges = action.payload.charges;
        item.description = action.payload.description;
        item.images = action.payload.images;
        item.categoriesserviceOwner = action.payload.serviceOwner;
      } else {
        state.sellerService.push(action.payload);
      }

      // if(action.payload)
      // if(state.sellerService.length==1){
      //   state.sellerService.push(action.payload)
      // }else{
      //   state.sellerService.push(action.payload)

      // }
    },
    deleteService(state, action) {
      state.sellerService = state.sellerService.filter(
        item => item.serviceOwner.id != action.payload.serviceOwner.id,
      );
    },
    setLoaction(state, action) {
      state.location = action.payload;
      console.log('🚀 ~ setLoaction ~ ==============location:', action.payload);
    },
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  AddToCart,
  RemoveToCart,
  setLiked,
  setCotton,
  setSize,
  setColor,
  decrementQuantity,
  increamentQuantity,
  EmptyCart,
  setServiceBooking,
  setAddProducts,
  setServices,
  deleteService,
  deleteProducts,
  Order,
  setLoaction,
  setPickupLocation,
  setDropoffLocation,
} = CommonSlice.actions;

export default CommonSlice.reducer;
