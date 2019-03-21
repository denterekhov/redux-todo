//Core
import { Map } from 'immutable';

// Reducer
import { uiReducer } from '../reducer';

// Actions
import { uiActions } from '../actions';

const initialState = Map({
    isSpinning:  false,
    editingTask: {
        editingTaskMessage: '',
        editingTaskId:      '',
    },
});

describe('ui reducer', () => {
    test('should return initial state by default', () => {
        expect(uiReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle START_EDIT_TASK action', () => {
        expect(uiReducer(void 0, uiActions.startEditTask(__.task.message, __.task.id)))
            .toEqual(initialState.update('editingTask', () => ({
                editingTaskMessage: __.task.message,
                editingTaskId:      __.task.id,
            })));
    });

    test('should handle STOP_EDIT_TASK action', () => {
        expect(uiReducer(void 0, uiActions.stopEditTask()))
            .toEqual(initialState.update('editingTask', () => ({
                editingTaskMessage: '',
                editingTaskId:      '',
            })));
    });

    test('should handle UPDATE_TASK_MESSAGE action', () => {
        expect(uiReducer(void 0, uiActions.updateTaskMessage(__.task.message)))
            .toEqual(initialState.updateIn(['editingTask', 'editingTaskMessage'], () => __.task.message));
    });

    test('should handle START_SPINNING action', () => {
        expect(uiReducer(void 0, uiActions.startSpinning()))
            .toEqual(initialState.set('isSpinning', true));
    });

    test('should handle STOP_SPINNING action', () => {
        expect(uiReducer(void 0, uiActions.stopSpinning()))
            .toEqual(initialState.set('isSpinning', false));
    });
});
