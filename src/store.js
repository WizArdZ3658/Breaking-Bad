import { createStore, applyMiddleware } from "redux";

const initialState = {
    allCharacters : [],
    currentPage: 1,
    perPage: 10,
    character_id : 1,
    quotes : [],
    errors : null,
    messages : null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD":
      var data = action.data;
      return {
        ...state,
        allCharacters : data
      };
    case "PAGE":
      return {
        ...state,
        currentPage : action.data
      };
    case "QUOTE":
      return {
        ...state,
        quotes : action.data
      };
    case "CHAR":
      return {
        ...state,
        character_id : action.data
      };
    case "ERRORS":
      return {
        ...state,
        errors: action.data,
      };
    case "MESSAGES":
      return {
        ...state,
        messages: action.data,
      };
    default:
      return state;
  }
  return state;
}

const store = createStore(
  reducer
);

export default store;