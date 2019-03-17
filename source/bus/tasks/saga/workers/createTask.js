//Core
import { put, apply } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* createTask ({ payload: task }) {
    try {
        const response = yield apply(api, api.create, [task]);
        const { data: newTask, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.createTask(newTask));
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
    }
}
