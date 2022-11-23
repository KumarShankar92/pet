import { GET_DATA, SET_DATA } from '../Actions/types';


const initialState = {
  petData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state, ...action.payload};

    case SET_DATA:
      return {
        ...state, ...action.payload
      };

    default:
      return state;
  }
};
