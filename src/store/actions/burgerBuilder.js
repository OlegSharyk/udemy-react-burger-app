import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngridient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngridient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngridients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngridients = () => {
    return dispatch => {
        axios
            .get('https://os-react-burger-app.firebaseio.com/ingridients.json')
            .then(response => {
                dispatch(setIngridients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngridientsFailed());
            });
    };
};
