// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { api } from '../../../REST/api';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../actions';
import { removeTask } from '../saga/workers';

describe('removeTask saga', () => {
    test('should complete a 204 status response scenario', async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.remove, [__.task.id]), __.fetchResponseSuccess204]])
            .put(tasksActions.removeTask(__.task.id))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.remove, [__.task.id]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'removeTask worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
