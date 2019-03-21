//Core
import { put, apply } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* completeAllTasks ({ payload: tasks }) {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.update, [tasks]);
        const { data: updatedTasks, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.completeAllTasks(updatedTasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeAllTasks worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
