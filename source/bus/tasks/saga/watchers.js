//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Workers
import { fetchTasks, createTask, removeTask } from './workers';

//Types
import { types } from '../types';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

export function* watchTasks () {
    yield all([call(watchFetchTasks), call(watchCreateTask), call(watchRemoveTask)]);
}
