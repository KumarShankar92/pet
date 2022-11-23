import { GET_DATA, SET_DATA } from './types';


export const getData = (payload) => ({
    type: GET_DATA,
    payload: payload,
});
export const setData = (payload) => ({
    type: SET_DATA,
    payload: payload,
});