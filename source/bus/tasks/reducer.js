//Core
import { fromJS, List } from 'immutable';

import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.UPDATE_TASK:
            return state.map((task) => {
                return task.get('id') === action.payload.id
                    ? fromJS(action.payload)
                    : task;
            });

        case types.REMOVE_TASK:
            return state.filter((task) => {
                return task.get('id') !== action.payload;
            });

        case types.COMPLETE_ALL_TASKS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
