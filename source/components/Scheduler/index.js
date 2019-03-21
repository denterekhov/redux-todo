// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Control, actions as formActions } from 'react-redux-form/immutable';

// Instruments
import Styles from './styles.m.css';
import { sortTasksByGroup } from '../../instruments/helpers';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from '../../bus/tasks/actions';
import { uiActions } from '../../bus/ui/actions';

const mapStateToProps = (state) => {
    return {
        ui:         state.ui,
        tasks:      state.tasks,
        newTask:    state.form.formValues.newTask,
        taskSearch: state.form.formValues.taskSearch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...tasksActions,
            ...uiActions,
            clearInput: () => formActions.reset('formValues.newTask'),
        }, dispatch),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _filterTasks = () => {
        const { tasks, taskSearch } = this.props;

        return tasks.filter((task) =>
            task.get('message').toLocaleLowerCase().includes(taskSearch.toLocaleLowerCase())
        );
    }

    _handleSubmit = () => {
        const {
            actions: {
                createTaskAsync,
                clearInput,
            },
            newTask,
        } = this.props;

        if (!newTask.trim()) {
            return null;
        }
        createTaskAsync(newTask);
        clearInput();
    }

    _completeAllTasks = () => {
        const { tasks, actions } = this.props;

        if (this._getAllCompleted()) {
            return null;
        }
        const completedTasks = tasks.map((task) => {
            return task.set('completed', true);
        });

        actions.completeAllTasksAsync(completedTasks);
    }

    _getAllCompleted = () => {
        const { tasks } = this.props;

        return tasks.every((task) => task.get('completed'));
    }

    render () {
        const {
            actions: {
                removeTaskAsync,
                updateTaskAsync,
                startEditTask,
                stopEditTask,
            },
            ui,
            tasks,
            taskSearch,
        } = this.props;

        const areTasksCompleted = tasks.size && this._getAllCompleted();
        const filteredTasks = taskSearch ? this._filterTasks() : tasks;
        const sortedTasks = sortTasksByGroup(filteredTasks);
        const todoList = sortedTasks.map((task) => (
            <Task
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                removeTaskAsync = { removeTaskAsync }
                startEditTask = { startEditTask }
                stopEditTask = { stopEditTask }
                updateTaskAsync = { updateTaskAsync }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { ui.get('isSpinning') } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Control.text
                            model = 'formValues.taskSearch'
                            placeholder = 'Поиск'
                            type = 'search'
                        />
                    </header>
                    <section>
                        <Form
                            model = 'formValues'
                            onSubmit = { this._handleSubmit }>
                            <Control.text
                                autoFocus
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = '.newTask'
                                placeholder = 'Описание моей новой задачи'
                            />
                            <button type = 'submit'>Добавить задачу</button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { areTasksCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}

export default Scheduler;
