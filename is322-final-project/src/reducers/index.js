import { ADD_REVIEW } from "../constants/action-types";

const initialState = {
    reviews: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_REVIEW) {
      return Object.assign({}, state, {
        reviews: state.reviews.concat(action.payload)
      });
    }
    return state;
  };
  
  export default rootReducer;