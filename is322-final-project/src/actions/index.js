import { ADD_REVIEW } from "../constants/action-types";


export function addReview(payload) {
    return { type: ADD_REVIEW, payload }
  };