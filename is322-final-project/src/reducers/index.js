import { ADD_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURAUNT } from "../constants/action-types";

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

    if (action.type === SAVE_RESTAURAUNT) {
      return Object.assign({}, state, {
        savedRestauraunts: state.savedRestauraunts.concat(action.payload)
      });
    }

    return state;
  };
  
  export default rootReducer;