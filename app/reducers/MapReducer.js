/* Local libraries */
import { getAccount } from 'userServices';
import { getNearRestaurants } from 'restaurantServices';

const actions = {
    create: 'CREATE_MAP',
    update: 'UPDATE_MAP',
    clear: 'CLEAR_MAP'
};

export const createMap = payload => {
    return {
        type: "CREATE_MAP",
        payload
    };
};

export const updateMap = payload => {
    return {
        type: "UPDATE_MAP",
        payload
    };
};

export const clearMap = () => {
    return {
        type: "CLEAR_MAP"
    };
};

export const getUserInfo = () => async dispatch => {
    try {
        const { data: { name, country: { id } } } = await getAccount();
        dispatch(updateMap({ name, country: id }));
    } catch(error) {
        alert('Could not get user info :/');
    }
};

export const getRestaurants = (lat, lng) => async (dispatch, getState) => {
    try {
        const { country } = getState().MapReducer;
        const { data: { data } } = await getNearRestaurants(`${lat},${lng}`, country);
        dispatch(updateMap({ restaurants: data }));
    } catch(error) {
        alert('Could not get restaurants :/');
    }
};
  

const initialState = {
    currentLat: 0,
    currentLong: 0,
    name: '',
    restaurants: [],
    country: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.create: return action.payload;
        case actions.update: return { ...state, ...action.payload };
        case actions.clear: return {};
        default: return state;
    }
};