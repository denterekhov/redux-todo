// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { api } from '../../../REST/api';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../actions';
import { createTask } from '../saga/workers';

describe('createTask saga', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(createTask, { payload: __.task.message })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.create, [__.task.message]), __.fetchResponseSuccessTask]])
            .put(tasksActions.createTask(__.task))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(createTask, { payload: __.task.message })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.create, [__.task.message]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'createTask worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
