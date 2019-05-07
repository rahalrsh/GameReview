import {LOGGED_IN, LOGGED_OUT, ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "../constants/action-types";

export function userLoggedInAction(payload) {
    return { type: LOGGED_IN, payload }
};

export function userLoggedOutAction(payload) {
    return { type: LOGGED_OUT, payload }
};

export function addFlashMessage(payload) {
    return { type: ADD_FLASH_MESSAGE, payload }
}

export function removeFlashMessage(payload) {
    return { type: REMOVE_FLASH_MESSAGE, payload }
}