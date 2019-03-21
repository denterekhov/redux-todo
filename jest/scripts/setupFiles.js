/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module executes before setupFramework module.
**
*/
import { fetch } from './mocks/fetch';
const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const error = new Error(errorMessage);
const meta = 'META_INFORMATION';

const task = {
    id:        'TEST_ID',
    message:   'test_message',
    favorite:  'true',
    completed: 'false',
};

const task2 = {
    id:        'TEST_ID',
    message:   'test_message_2',
    favorite:  'false',
    completed: 'true',
};

const task3 = {
    id:        'TEST_ID_3',
    message:   'test_message_3',
    favorite:  'false',
    completed: 'true',
};

const tasks = [task2, task3];

const responseDataSuccess = {
    data:    tasks,
    message: successMessage,
};

const responseDataSuccessTask = {
    data:    task,
    message: successMessage,
};

const responseDataSuccessUpdateTask = {
    message: successMessage,
    data:    [
        task
    ],
};

const responseDataFail = {
    message: errorMessage,
};

const responseDataFailUpdateTask400 = {
    message: errorMessage,
    data:    [],
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccess204 = {
    status: 204,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccessTask = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccessTask)),
};

const fetchResponseSuccessUpdateTask = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccessUpdateTask)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFailUpdateTask400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFailUpdateTask400)),
};

global.__ = {
    task,
    tasks,
    error,
    meta,
    fetchResponseSuccess,
    fetchResponseSuccess204,
    fetchResponseSuccessTask,
    fetchResponseSuccessUpdateTask,
    fetchResponseFail400,
    fetchResponseFailUpdateTask400,
};

global.fetch = fetch;
global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
