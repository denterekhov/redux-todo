// Core
import { combineReducers } from 'redux';
import { tasksReducer as tasks } from '../bus/tasks/reducer';
import { formReducer as form } from '../bus/form/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
    tasks,
    form,
    ui,
});
