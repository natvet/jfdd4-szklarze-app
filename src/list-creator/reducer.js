import {
    INCREASE_AMOUNT,
    DECREASE_AMOUNT,
    SAVE_NEW_LIST,
    SET_CURRENT_LIST_NAME,
    DELETE_LIST,
    MARK_PRODUCT_AS_PURCHASED
} from './actionTypes'

const initialState = {
    itemsToBuy: [],
    shoppingLists: [],
    currentListName: [],
    purchasedProductsIds: []
}

export default (state = initialState, action) => {
    let itemsToBuyContainsGivenItem = state.itemsToBuy.filter(item => item.productId === action.productId).length > 0;
    let itemsToBuy = state.itemsToBuy.concat(state.currentListName);

    switch (action.type) {
        case INCREASE_AMOUNT:
            itemsToBuy = itemsToBuyContainsGivenItem ?
                state.itemsToBuy.map(item => (item.productId === action.productId ?
                {productId: item.productId, quantity: item.quantity + 1} : item)) :
                state.itemsToBuy.concat([{productId: action.productId, quantity: 1}]);
            return Object.assign({}, state, {
                itemsToBuy: itemsToBuy
            })
        case DECREASE_AMOUNT:
            itemsToBuy = itemsToBuyContainsGivenItem ?
                state.itemsToBuy.map(item => (item.productId === action.productId ?
                {productId: item.productId, quantity: item.quantity - 1} : item)) : state.itemsToBuy;
            return Object.assign({}, state, {
                itemsToBuy: itemsToBuy.filter( item => item.quantity > 0)
            })
        case SAVE_NEW_LIST:
            return Object.assign({}, state, {
                shoppingLists: state.shoppingLists
                                    .concat([itemsToBuy]),
                itemsToBuy: [],
                currentListName: []
            })
        case SET_CURRENT_LIST_NAME:
            return Object.assign({}, state, {
                currentListName: action.listName
            })
        case DELETE_LIST:
            console.log(state, action.listId)
            return Object.assign({}, state, {
                shoppingLists: state.shoppingLists
                    .filter((list, index) => index !== Number(action.listId))
            })
        case MARK_PRODUCT_AS_PURCHASED:
            return Object.assign({}, state, {
                purchasedProductsIds: state.purchasedProductsIds.concat([action.productId]),
                shoppingLists: state.shoppingLists
                    .map((list, index) => index === Number(action.listId) ?
                                            list.filter((product, id) => id !== action.productId) :
                                            list)
            })
        default:
            return state
    }
}

