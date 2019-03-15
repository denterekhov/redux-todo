//Core
import { put, apply } from 'redux-saga/effects';

import { api } from '../../../../REST/api';
import { tasksActions } from '../../actions';

export function* fetchTasks () {
    try {
        const response = yield apply(api, api.fetch);
        const { data: tasks, message } = yield apply(response, response.json);

        yield put(tasksActions.fillTasks(tasks));
    } catch (error) {
        console.log('error: ', error);
    }
}
