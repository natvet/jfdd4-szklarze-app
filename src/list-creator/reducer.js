import {
    SAVE_NEW_LIST,
    RECEIVE_SHOPPING_LISTS,
    DELETE_LIST
} from './actionTypes'
import {
    UPDATE_LIST_NAME
} from './list-name-editor/actionTypes'

const initialState = {
    shoppingLists: []
}

export default (state = initialState, action) => {

    switch (action.type) {

        case SAVE_NEW_LIST:
            let shoppingListWithName = action.itemsToBuy.concat(action.listName)
            return Object.assign({}, state, {
                shoppingLists: state.shoppingLists
                    .concat([shoppingListWithName])
            })
        case RECEIVE_SHOPPING_LISTS:
            return Object.assign({}, state, {
                shoppingLists: action.shoppingLists
            })
        case UPDATE_LIST_NAME:
            return Object.assign({}, state, {
                shoppingLists: state.shoppingLists
                    .map( (list, index) => (
                        index === Number(action.listId) ?
                            typeof list[list.length-1] === 'object' ?
                                list.concat(action.newListName) :
                                list
                                    .slice(0, list.length-1)
                                    .concat(action.newListName) :
                            list
                    ))
            })
        case DELETE_LIST:
            return Object.assign({}, state, {
                shoppingLists: state.shoppingLists
                    .filter((list, index) => index !== Number(action.listId))
            })
        default:
            return state
    }
}
