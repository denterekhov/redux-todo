// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { api } from '../../../REST/api';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../../tasks/actions';
import { fetchTasks } from '../saga/workers';

describe('fetchTasks saga', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.fetch), __.fetchResponseSuccess]])
            .put(tasksActions.fillTasks(__.tasks))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.fetch), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'fetchTasks worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
