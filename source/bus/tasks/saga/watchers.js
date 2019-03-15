//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Workers
import { fetchTasks } from './workers/fetchTasks';

//Types
import { types } from '../types';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

export function* watchTasks () {
    yield all([call(watchFetchTasks)]);
}
