import { LOGGED_IN, LOGGED_OUT, ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../constants/action-types";

const initialState = {
    isLoggedIn: false,
    userName: '',

    flashMessageType: '',
    flashMessageText: ''
};

function rootReducer(state = initialState, action) {
    if (action.type === LOGGED_IN) {
        return Object.assign({}, state, {
            isLoggedIn: true,
            userName: action.payload.userName
        });
    }

    if (action.type === LOGGED_OUT) {
        return Object.assign({}, state, {
            isLoggedIn: false,
            userName: ''
        });
    }

    if(action.type === ADD_FLASH_MESSAGE) {
        return Object.assign({}, state, {
            flashMessageType: action.payload.flashMessageType,
            flashMessageText: action.payload.flashMessageText
        });
    }

    if(action.type === REMOVE_FLASH_MESSAGE) {
        return Object.assign({}, state, {
            flashMessageType: null,
            flashMessageText: null
        });
    }

    return state;
};

export default rootReducer;