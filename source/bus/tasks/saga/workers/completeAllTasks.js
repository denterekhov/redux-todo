//Core
import { put, apply, call, all } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* completeAllTasks ({ payload: tasks }) {
    try {
        const responses = yield all(tasks.toJS().map((task) => apply(api, api.update, [task])));

        if (responses.some((response) => response.status !== 200)) {
            throw new Error('Task wasn\'t updated');
        }
        const jsonData = yield all(responses.map((response) => apply(response, response.json)));
        const updatedTasks = yield all(jsonData.map((rawData) => rawData.data[0]));

        yield put(tasksActions.completeAllTasks(updatedTasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeAllTasks worker'));
    }
}
