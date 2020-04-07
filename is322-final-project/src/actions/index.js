import { ADD_REVIEW } from "../constants/action-types";
import { SAVE_RESTAURAUNT } from "../constants/action-types";
import { REMOVE_RESTAURAUNT } from "../constants/action-types";


export function addReview(payload) {
    return { type: ADD_REVIEW, payload }
  };

export function saveRestauraunt(payload) {
  return { type: SAVE_RESTAURAUNT, payload }
};

export function removeRestauraunt(payload) {
  return { type: REMOVE_RESTAURAUNT, payload}
}