// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Control, actions as formActions } from 'react-redux-form/immutable';

// Instruments
import Styles from './styles.m.css';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from '../../bus/tasks/actions';

const mapStateToProps = (state) => {
    return {
        tasks:      state.tasks,
        newTask:    state.form.formValues.newTask,
        taskSearch: state.form.formValues.taskSearch,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ 
            ...tasksActions,
            clearInput: () => formActions.reset('formValues.newTask')
        }, dispatch),
    }
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _filterTasks = () => {
        const { tasks, taskSearch } = this.props;
        return tasks.filter((task) => 
            task.get('message').toLocaleLowerCase().includes(taskSearch)
        )
    }

    _handleSubmit = () => {
        const { 
            actions: {
                createTaskAsync,
                clearInput
            }, 
            newTask 
        } = this.props;
        createTaskAsync(newTask);
        clearInput();
    }

    render () {
        const { 
            actions: {
                removeTaskAsync,
                updateTaskAsync
            },
            tasks,
            taskSearch
        } = this.props;

        const filteredTasks = taskSearch ? this._filterTasks() : tasks;

        const todoList = filteredTasks.map((task) => (
            <Task
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                removeTaskAsync = { removeTaskAsync }
                updateTaskAsync = { updateTaskAsync }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Control.text
                            model = "formValues.taskSearch"
                            placeholder = 'Поиск'
                            type = 'search'
                        />
                    </header>
                    <section>
                        <Form
                            model = "formValues"
                            onSubmit = {this._handleSubmit}
                        >
                            <Control.text 
                                model = ".newTask"
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                            />
                            <button type="submit">Добавить задачу</button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
