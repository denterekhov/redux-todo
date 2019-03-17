//Core
import { Map } from 'immutable';
import { combineForms } from 'react-redux-form';

const formValues = Map({
    newTask:    '',
    taskSearch: '',
});

export const formReducer = combineForms({
    formValues,
});