// Actions
import { uiActions } from '../actions';

describe('ui actions:', () => {
    test('emitError', () => {
        expect(uiActions.emitError(__.error)).toMatchSnapshot();
    });

    test('emitError with meta information', () => {
        expect(uiActions.emitError(__.error, __.meta)).toMatchSnapshot();
    });

    test('startEditTask', () => {
        expect(uiActions.startEditTask(__.task.message, __.task.id)).toMatchSnapshot();
    });

    test('stopEditTask', () => {
        expect(uiActions.stopEditTask()).toMatchSnapshot();
    });

    test('updateTaskMessage', () => {
        expect(uiActions.updateTaskMessage(__.task.message)).toMatchSnapshot();
    });

    test('startSpinning', () => {
        expect(uiActions.startSpinning()).toMatchSnapshot();
    });

    test('stopSpinning', () => {
        expect(uiActions.stopSpinning()).toMatchSnapshot();
    });
});
