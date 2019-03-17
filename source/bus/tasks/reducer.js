//Core
import { fromJS, List } from 'immutable';

import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return [fromJS(action.payload), ...state];

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

        default:
            return state;
    }
};
