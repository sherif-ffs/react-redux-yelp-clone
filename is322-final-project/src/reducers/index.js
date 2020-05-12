import { ADD_REVIEW } from "../constants/action-types";
import { REMOVE_REVIEW } from "../constants/action-types";
import { EDIT_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURAUNT } from "../constants/action-types";
import { REMOVE_RESTAURAUNT } from "../constants/action-types";

import userImage from '../../src/assets/user_large_square.png'


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
      state.reviews.forEach(review => {
        if (review === action.payload.review) {
          index = state.reviews.indexOf(review)
        }
      })
      state.reviews.splice(index, 1)
      return Object.assign({}, state, {
        reviews: state.reviews
      });
    }

    if (action.type === EDIT_REVIEW) {
      let currentReview = action.payload.review;

      let reviews = state.reviews;
      let index = reviews.indexOf(currentReview)
      let updatedReview = {
        name: currentReview.name,
        id: currentReview.id,
        time_created: currentReview.time_created,
        rating: action.payload.modalState.newRating,
        text: action.payload.modalState.newText,
        user: {
          image_url: userImage
        }
      }
      state.reviews[index] = updatedReview;
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