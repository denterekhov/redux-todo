import { types } from './types';

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },
    updateTask: (task) => {
        return {
            type:    types.UPDATE_TASK,
            payload: task,
        };
    },
    removeTask: (taskId) => {
        return {
            type:    types.REMOVE_TASK,
            payload: taskId,
        };
    },
    completeAllTasks: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS,
            payload: tasks,
        };
    },

    // Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (task) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: task,
        };
    },
    updateTaskAsync: (task) => {
        return {
            type:    types.UPDATE_TASK_ASYNC,
            payload: task,
        };
    },
    removeTaskAsync: (taskId) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },
    completeAllTasksAsync: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: tasks,
        };
    },
};
