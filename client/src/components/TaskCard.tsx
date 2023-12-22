import React from 'react';
import { SubTask, Task } from '../types/common';
import Wrapper from '../assets/wrappers/TaskCard';
import axios from 'axios';
import customToast from './customToast';
import { selectTasks, setTasks } from '../redux/slices/tasks';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Loading from './Loading';
import { MoonLoader } from 'react-spinners';

const TaskCard: React.FC<{
    handleShowDeleteModule: (param: string) => void;
    cardStates: any;
    toggleCardOpen: (param: string) => void;
    refProp: any;
    draggableProps: any;
    dragHandleProps: any;
    task: Task;
    dashboardDate: Date;
    setEditTaskModuleOpen: (param: boolean) => void;
    setUpdateId: (param: string) => void;
}> = ({ handleShowDeleteModule, cardStates, toggleCardOpen, refProp, draggableProps, dragHandleProps, setEditTaskModuleOpen, setUpdateId, task, dashboardDate }) => {
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector(selectAuth);
    const tasks = useAppSelector(selectTasks);
    const { REACT_APP_API_BASE_URL } = process.env;

    const handleSelect = async (event: any) => {
        const loadingTask: Task = {
            _id: 'loading-card',
            taskName: '',
            subTasks: [{ task: '', done: false }],
            createdBy: '',
            status: event.target.value,
            date: task.date,
            estimatedTime: '',
            createdAt: task.date,
            updatedAt: task.date,
            orderIndex: tasks.filter(task => task.status === event.target.value).length,
            loading: true,
        };
        dispatch(setTasks([...tasks, loadingTask]));
        toggleCardOpen(task._id);
        try {
            const response = await axios.patch(
                `${REACT_APP_API_BASE_URL}/api/v1/tasks/${task._id}`,
                { status: event.target.value },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const updatedTasks = tasks.map((obj: any) => (obj._id === task._id ? { ...obj, status: event.target.value } : obj));
            dispatch(setTasks(updatedTasks));
        } catch (error: any) {
            const updatedTasks = tasks.filter(task => task._id !== 'loading-card');
            dispatch(setTasks(updatedTasks));
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');
        }
    };
    const handleSubtaskToggle = async (taskId: any, subtaskIndex: number) => {
        const taskToUpdate = tasks.find(task => task._id === taskId);
        const updatedTasks = tasks.map(task => (task._id === taskId ? { ...task, subTaskLoading: subtaskIndex } : task));
        const updatedSubTasks = taskToUpdate!.subTasks.map((subtask, index) => {
            if (index === subtaskIndex) {
                return {
                    ...subtask,
                    done: !subtask.done,
                };
            }
            return subtask;
        });
        dispatch(setTasks(updatedTasks)); // Update the state with the modified tasks array
        try {
            const response = await axios.patch(
                `${REACT_APP_API_BASE_URL}/api/v1/tasks/${taskId}`,
                { subTasks: updatedSubTasks },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    const updatedSubTasks = task.subTasks.map((subtask, index) => {
                        if (index === subtaskIndex) {
                            return {
                                ...subtask,
                                done: !subtask.done,
                            };
                        }
                        return subtask;
                    });
                    return {
                        ...task,
                        subTasks: updatedSubTasks,
                    };
                }
                return task;
            });
            dispatch(setTasks(updatedTasks)); // Update the state with the modified tasks array
        } catch (error: any) {
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');

            console.error(error);

            const updatedTasks = tasks.map(task => (task._id === taskId ? { ...task, subTaskLoading: undefined } : task));
            dispatch(setTasks(updatedTasks)); // Update the state with the modified tasks array
        }
    };
    return (
        <Wrapper
            ref={refProp}
            {...draggableProps}
            theme={task.status === 'in progress' ? '#E9B949' : task.status === 'open' ? '#BFDBFE' : '#4CCA8F'}
            color={task.status === 'in progress' ? '#916809' : task.status === 'open' ? '#2782f1' : '#088149'}
        >
            {!cardStates[task._id] ? (
                <div className="closed-card">
                    <div className="left" title="click to expand" onClick={() => toggleCardOpen(task._id)}>
                        {task?.loading ? <Loading /> : <p className="taskname">{task.taskName}</p>}
                    </div>
                    <div className="right" {...dragHandleProps}>
                        <RxDragHandleDots2 size={40} />
                    </div>
                </div>
            ) : (
                <div className="expanded-card" onClick={() => toggleCardOpen(task._id)}>
                    {task?.loading ? (
                        <div className="white-bg">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className="left">
                                <span className="estimated-time">{task.estimatedTime} hr</span>
                                <p className="taskname">{task.taskName}</p>
                                <ul className="subtasks-list">
                                    {task.subTasks.map((subtask: SubTask, index) => {
                                        return (
                                            <li key={index} onClick={e => e.stopPropagation()}>
                                                {task.status === 'in progress' &&
                                                    (task?.subTaskLoading === index ? (
                                                        <MoonLoader size={12} color="#3B82F6" speedMultiplier={0.3} />
                                                    ) : (
                                                        <input
                                                            id={`${index}`}
                                                            type="checkbox"
                                                            checked={subtask.done}
                                                            onChange={e => {
                                                                e.stopPropagation();
                                                                handleSubtaskToggle(task._id, index);
                                                            }}
                                                        />
                                                    ))}
                                                <label htmlFor={task.status === 'in progress' ? `${index}` : ''}>{subtask.task}</label>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <select onClick={e => e.stopPropagation()} defaultValue={task.status} id="status-select" onChange={handleSelect}>
                                    <option value="open">Open</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <div className="right" onClick={e => e.stopPropagation()}>
                                <div className="right_top" {...dragHandleProps}>
                                    <RxDragHandleDots2 size={task.subTasks.length > 3 ? 50 : 40} />
                                </div>
                                <div className="right_bottom" style={{ gap: task.subTasks.length > 3 ? '10px' : '5px' }}>
                                    <div
                                        className="icon"
                                        onClick={() => {
                                            setUpdateId(task._id);
                                            setEditTaskModuleOpen(true);
                                        }}
                                    >
                                        <FiEdit size={task.subTasks.length > 3 ? 30 : 20} />
                                    </div>
                                    <div className="icon" onClick={() => handleShowDeleteModule(task._id)}>
                                        <FaTrash size={task.subTasks.length > 3 ? 30 : 20} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Wrapper>
    );
};

export default TaskCard;
