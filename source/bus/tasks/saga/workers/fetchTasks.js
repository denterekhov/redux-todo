//Core
import { put, apply } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fetchTasks () {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.fetch);
        const { data: tasks, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.fillTasks(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchTasks worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
