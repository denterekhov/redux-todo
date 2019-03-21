// Core
import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { uiActions } from '../../bus/ui/actions';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

const mapStateToProps = (state) => {
    return {
        editingTaskMessage: state.ui.getIn(['editingTask', 'editingTaskMessage']),
        editingTaskId:      state.ui.getIn(['editingTask', 'editingTaskId']),
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateTaskMessage: (message) => dispatch(uiActions.updateTaskMessage(message)),
});

@connect(
    mapStateToProps,
    mapDispatchToProps
)

class Task extends PureComponent {
    componentDidUpdate = () => {
        this.taskInput.current.focus();
    }

    taskInput = createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _toggleTaskCompletedState = () => {
        const { updateTaskAsync, completed } = this.props;

        updateTaskAsync([this._getTaskShape({ completed: !completed })]);
    };

    _toggleTaskFavoriteState = () => {
        const { updateTaskAsync, favorite } = this.props;

        updateTaskAsync([this._getTaskShape({ favorite: !favorite })]);
    };

    _updateNewTaskMessage = (e) => {
        const { updateTaskMessage } = this.props;

        updateTaskMessage(e.target.value);
    };

    _updateTaskMessageOnKeyDown = (event) => {
        const { editingTaskMessage, stopEditTask } = this.props;

        const enterKey = event.key === 'Enter';
        const escKey = event.key === 'Escape';

        if (!editingTaskMessage.trim()) {
            return null;
        }
        if (enterKey) {
            this._updateTask();
        }
        if (escKey) {
            stopEditTask();
        }
    };

    _updateTask = () => {
        const { message, editingTaskMessage, updateTaskAsync, stopEditTask } = this.props;

        if (editingTaskMessage.trim() === message.trim() || !editingTaskMessage) {
            stopEditTask();

            return null;
        }
        updateTaskAsync([this._getTaskShape({ message: editingTaskMessage })]);
        stopEditTask();
    };

    _updateTaskMessageOnClick = () => {
        const { message, startEditTask, stopEditTask, editingTaskId, id } = this.props;

        if (editingTaskId === id) {
            stopEditTask();
        } else {
            startEditTask(message, id);
        }
    }

    _removeTask = () => {
        const { removeTaskAsync, id } = this.props;

        removeTaskAsync(id);
    }

    render () {
        const { message, completed, favorite, editingTaskId, editingTaskMessage, id } = this.props;
        const isTaskEditing = editingTaskId === id;
        const messageValue = isTaskEditing ? editingTaskMessage : message;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { messageValue }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}

export default Task;
