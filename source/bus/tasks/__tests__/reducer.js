//Core
import { fromJS, List } from 'immutable';

// Reducer
import { tasksReducer } from '../reducer';

// Actions
import { tasksActions } from '../actions';

const initialState = List();

describe('tasks reducer:', () => {
    test('should return initial state by default', () => {
        expect(tasksReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle FILL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.fillTasks(__.tasks)))
            .toEqual(fromJS(__.tasks));
    });

    test('should handle CREATE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.task)))
            .toEqual(initialState.unshift(fromJS(__.task)));
    });

    test('should handle UPDATE_TASK action', () => {
        expect(tasksReducer(fromJS(__.tasks), tasksActions.updateTask(__.task)))
            .toEqual(fromJS(__.tasks).map((task) => {
                return task.get('id') === __.task.id
                    ? fromJS(__.task)
                    : task;
            }));
    });

    test('should handle REMOVE_TASK action', () => {
        expect(tasksReducer(fromJS(__.tasks), tasksActions.removeTask(__.task.id)))
            .toEqual(fromJS(__.tasks).filter((task) => {
                return task.get('id') !== __.task.id;
            }));
    });

    test('should handle COMPLETE_ALL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.completeAllTasks(__.tasks)))
            .toEqual(fromJS(__.tasks));
    });
});
