//Types
import { types } from './types';

export const uiActions = {
    emitError: (error, meta = null) => {
        return {
            type:    types.EMIT_ERROR,
            payload: error,
            error:   true,
            meta,
        };
    },
    startEditTask: (editingTaskMessage, editingTaskId) => {
        return {
            type:    types.START_EDIT_TASK,
            payload: {
                editingTaskMessage,
                editingTaskId,
            },
        };
    },
    stopEditTask: () => {
        return {
            type: types.STOP_EDIT_TASK,
        };
    },
    updateTaskMessage: (message) => {
        return {
            type:    types.UPDATE_TASK_MESSAGE,
            payload: message,
        };
    },
};
