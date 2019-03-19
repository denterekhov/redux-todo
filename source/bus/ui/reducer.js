//Core
import { Map } from 'immutable';

import { types } from './types';

const initialState = Map({
    isTasksFetching: false,
    editingTask: {
        editingTaskMessage: '',
        editingTaskId:      '',
    }
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_EDIT_TASK:
            return state.update('editingTask', () => action.payload);

        case types.STOP_EDIT_TASK:
            return state.update('editingTask', () => ({
                editingTaskMessage: '',
                editingTaskId:      '',
            }));

        case types.UPDATE_TASK_MESSAGE:
            return state.updateIn(['editingTask', 'editingTaskMessage'], () => action.payload);

        default:
            return state;
    }
};
