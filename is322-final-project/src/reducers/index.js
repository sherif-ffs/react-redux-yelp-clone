import { ADD_REVIEW } from "../constants/action-types";
import { REMOVE_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURAUNT } from "../constants/action-types";
import { REMOVE_RESTAURAUNT } from "../constants/action-types";

const initialState = {
    reviews: [],
    savedRestauraunts: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_REVIEW) {
      return Object.assign({}, state, {
        reviews: state.reviews.concat(action.payload)
      });
    }

    if (action.type === REMOVE_REVIEW) {
      let index;
      // for (let i=0; i<state.reviews.length; i++) {
      //   console.log('state.review[i]: ', state.review[i])
      //   if (state.review[i].id === action.payload.id) {
      //     index = i
      //   }
      // }
      state.reviews.forEach(review => {
        console.log('review: ', review)
        console.log('action.payload: ', action.payload.review)
        if (review === action.payload.review) {
          index = state.reviews.indexOf(review)
          console.log('index: ', index)
        }
      })
      state.reviews.splice(index, 1)
      return Object.assign({}, state, {
        reviews: state.reviews
      });
    }

    if (action.type === SAVE_RESTAURAUNT) {
      return Object.assign({}, state, {
        savedRestauraunts: state.savedRestauraunts.concat(action.payload)
      });
    }

    if (action.type === REMOVE_RESTAURAUNT) {
      let index;
      for (let i=0; i<state.savedRestauraunts.length; i++) {
        if (state.savedRestauraunts[i].restauraunt.id === action.payload.restauraunt.id) {
          index = i
        }
      }
      state.savedRestauraunts.splice(index, 1)

      return Object.assign({}, state, {
        savedRestauraunts: state.savedRestauraunts
      });
    }

    return state;
  };
  
  export default rootReducer;