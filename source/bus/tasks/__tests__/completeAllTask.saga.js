// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { api } from '../../../REST/api';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../actions';
import { completeAllTasks } from '../saga/workers';

describe('completeAllTasks saga', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasks })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.update, [__.tasks]), __.fetchResponseSuccess]])
            .put(tasksActions.completeAllTasks(__.tasks))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasks })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.update, [__.tasks]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'completeAllTasks worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
