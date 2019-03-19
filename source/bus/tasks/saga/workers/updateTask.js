//Core
import { put, apply } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* updateTask ({ payload: task }) {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.update, [task]);
        const { data: [updatedTask], message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.updateTask(updatedTask));
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateTask worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
