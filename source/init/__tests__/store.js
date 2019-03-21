//Core
import { createStore, combineReducers } from 'redux';

//Reducers
import { tasksReducer as tasks } from '../../bus/tasks/reducer';
import { formReducer as form } from '../../bus/form/reducer';
import { uiReducer as ui } from '../../bus/ui/reducer';

//Store
import { store } from '../store';

const referenceRootReducer = combineReducers({
    tasks,
    form,
    ui,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
