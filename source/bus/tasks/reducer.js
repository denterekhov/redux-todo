//Core
import { fromJS, List } from 'immutable';

import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);
        default:
            return state;
    }
}