//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Workers
import { fetchTasks, createTask, updateTask, removeTask, completeAllTasks } from './workers';

//Types
import { types } from '../types';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchUpdateTask () {
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTask);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchCompleteAllTasks () {
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasks);
}

export function* watchTasks () {
    yield all([
        call(watchFetchTasks),
        call(watchCreateTask),
        call(watchUpdateTask),
        call(watchRemoveTask),
        call(watchCompleteAllTasks)
    ]);
}
