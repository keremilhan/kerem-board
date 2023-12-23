import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/AddNewTask';
import { BsPlusSquare } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { FaWindowClose } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';
import axios from 'axios';
import customToast, { ERRORS } from './customToast';
import { selectTasks, setTasks } from '../redux/slices/tasks';
import { SubTask, Task } from '../types/common';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { Calendar } from 'react-date-range';
import { AiOutlinePlus } from 'react-icons/ai';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';

const AddNewTask: React.FC<{
    handleTaskCounts: (param: 'increment' | 'decrement', param2: string) => void;
    task?: Task;
    startDate: Date;
    endDate: Date;
    setEditTaskModuleOpen?: (param: boolean) => void;
    setUpdateId?: (param: string) => void;
}> = ({ endDate, handleTaskCounts, setEditTaskModuleOpen, setUpdateId, task, startDate }) => {
    const [showAddTask, setShowAddTask] = useState<boolean>(task ? true : false);
    const [subTaskInputs, setSubTaskInputs] = useState<SubTask[]>(task?.subTasks ?? [{ task: '', done: false }]);
    const [taskInput, setTaskInput] = useState<string>(task?.taskName ?? '');
    const [estimatedTime, setEstimatedTime] = useState<string>(task?.estimatedTime ?? '');
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(task ? task.date : startDate);
    const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null);
    const { accessToken } = useAppSelector(selectAuth);
    const tasks = useAppSelector(selectTasks);
    const isLoadingTaskCard = tasks.find(task => task.loading === true);
    const dispatch = useAppDispatch();
    const { REACT_APP_API_BASE_URL } = process.env;
    const addInput = () => {
        if (subTaskInputs.length < 4) {
            const newInputs = [...subTaskInputs, { task: '', done: false }];
            setSubTaskInputs(newInputs);
            setFocusedInputIndex(newInputs.length - 1);
        }
    };

    const deleteInput = (indexToDelete: number) => {
        const newInputs = subTaskInputs.filter((_, index) => index !== indexToDelete);
        setSubTaskInputs(newInputs);
        setFocusedInputIndex(null);
    };

    const handleSubTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputs = [...subTaskInputs];
        newInputs[index] = { task: e.target.value, done: false };
        setSubTaskInputs(newInputs);
    };

    useEffect(() => {
        setDate(new Date(task ? task.date : startDate));
    }, [startDate, task]);
    const handleSelectDateRange = (date: any) => {
        const selectedDate = new Date(date);
        const hoursToAdd = 3;
        selectedDate.setHours(selectedDate.getHours() + hoursToAdd);
        selectedDate.setUTCHours(0, 0, 0, 0);
        setShowCalendar(false);
        setDate(selectedDate);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isLoadingTaskCard) {
            customToast(ERRORS.ONGOING_PROCESS, 'error');
            return;
        }
        if (taskInput === '') {
            customToast('Please provide task', 'error');
            return;
        }
        if (estimatedTime === '') {
            customToast('Please provide an estimated time', 'error');
            return;
        }
        closeModule();
        if (task) {
            //update
            try {
                const updatedTasks = tasks.map(task1 => (task1._id === task._id ? { ...task1, loading: true } : task1));
                dispatch(setTasks(updatedTasks));
                const response = await axios.patch(
                    `${REACT_APP_API_BASE_URL}/api/v1/tasks/${task._id}`,
                    { taskName: taskInput, subTasks: subTaskInputs.filter(subTask => subTask.task !== ''), date, estimatedTime },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const newTask: Task = response.data.task;
                if (endDate.getTime() === startDate.getTime()) {
                    if (new Date(newTask.date).getTime() === startDate.getTime()) {
                        const updatedTasks = tasks.map(task => (task._id === newTask._id ? { ...newTask } : task));
                        dispatch(setTasks(updatedTasks));
                    } else {
                        const updatedTasks = tasks.filter(task => task._id !== newTask._id);
                        dispatch(setTasks(updatedTasks));
                    }
                } else {
                    if (new Date(newTask.date).getTime() < endDate.getTime() && new Date(newTask.date).getTime() > startDate.getTime()) {
                        const updatedTasks = tasks.map(task => (task._id === newTask._id ? { ...newTask } : task));
                        dispatch(setTasks(updatedTasks));
                    } else {
                        const updatedTasks = tasks.filter(task => task._id !== newTask._id);
                        dispatch(setTasks(updatedTasks));
                    }
                }
                handleTaskCounts('decrement', new Date(task.date).toISOString());
                handleTaskCounts('increment', date.toISOString());
                closeModule();
            } catch (error: any) {
                if (error.response.status === 429) {
                    customToast('Too many requests. Please try again later.', 'error');
                    return;
                }
                customToast(error.response.data.msg, 'error');

                console.error(error);
            }
        } else {
            //create
            const loadingTask: Task = {
                _id: 'loading-card',
                taskName: '',
                subTasks: [{ task: '', done: false }],
                createdBy: '',
                status: 'open',
                date: date,
                estimatedTime: '',
                createdAt: date,
                updatedAt: date,
                orderIndex: tasks.filter(task => task.status === 'open').length,
                loading: true,
            };
            try {
                if (endDate.getTime() === startDate.getTime()) {
                    if (new Date(date).getTime() === startDate.getTime()) {
                        dispatch(setTasks([...tasks, loadingTask]));
                    }
                } else {
                    if (new Date(date).getTime() < endDate.getTime() && new Date(date).getTime() > startDate.getTime()) {
                        dispatch(setTasks([...tasks, loadingTask]));
                    }
                }

                const response = await axios.post(
                    `${REACT_APP_API_BASE_URL}/api/v1/tasks`,
                    { taskName: taskInput, subTasks: subTaskInputs.filter(subTask => subTask.task !== ''), date, estimatedTime, orderIndex: tasks.filter(task => task.status === 'open').length },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const newTask = response.data.task;
                if (endDate.getTime() === startDate.getTime()) {
                    if (new Date(newTask.date).getTime() === startDate.getTime()) {
                        dispatch(setTasks([...tasks, newTask]));
                    }
                } else {
                    if (new Date(newTask.date).getTime() < endDate.getTime() && new Date(newTask.date).getTime() > startDate.getTime()) {
                        dispatch(setTasks([...tasks, newTask]));
                    }
                }

                handleTaskCounts('increment', date.toISOString());
            } catch (error: any) {
                if (endDate.getTime() === startDate.getTime()) {
                    if (new Date(date).getTime() === startDate.getTime()) {
                        const updatedTasks = tasks.filter(task => task._id !== loadingTask._id);
                        dispatch(setTasks(updatedTasks));
                    }
                } else {
                    if (new Date(date).getTime() < endDate.getTime() && new Date(date).getTime() > startDate.getTime()) {
                        const updatedTasks = tasks.filter(task => task._id !== loadingTask._id);
                        dispatch(setTasks(updatedTasks));
                    }
                }
                if (error.response.status === 429) {
                    customToast('Too many requests. Please try again later.', 'error');
                    return;
                }
                customToast(error.response.data.msg, 'error');
            }
        }
    };

    const closeModule = () => {
        setTaskInput('');
        setSubTaskInputs([{ task: '', done: false }]);
        setEstimatedTime('');
        setShowAddTask(false);
        setFocusedInputIndex(null);
        if (setUpdateId && setEditTaskModuleOpen) {
            setUpdateId('');
            setEditTaskModuleOpen(false);
        }
    };
    return (
        <Wrapper>
            {!task && (
                <div className="new-task-button" onClick={() => setShowAddTask(true)}>
                    <BsPlusSquare size={25} /> New Task
                </div>
            )}
            {showAddTask && (
                <div className="new-task-bg">
                    <div className="new-task-container">
                        <div className="top">
                            <h2>{task ? 'Update Task' : 'New Task'}</h2>
                            <span onClick={closeModule}>
                                <FaWindowClose size={20} />
                            </span>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="date-time">
                                <div className="date-container">
                                    <div onClick={() => setShowCalendar(true)}>
                                        <AiTwotoneCalendar color="#3B82F6" size={30} />
                                    </div>
                                    <p>{moment(date).format('DD/MM/YYYY')}</p>
                                </div>
                                <input
                                    onChange={e => {
                                        const inputValue = e.target.value;
                                        // Convert the input to a numeric value
                                        if (/^\d*\.?\d*$/.test(inputValue)) {
                                            setEstimatedTime(inputValue);
                                        }
                                    }}
                                    maxLength={10}
                                    type="text"
                                    placeholder="Estimated Time"
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                    value={estimatedTime ?? ''}
                                    onFocus={() => setFocusedInputIndex(null)}
                                />
                            </div>
                            <input
                                onChange={e => setTaskInput(e.target.value)}
                                type="text"
                                placeholder="Task name"
                                maxLength={100}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                                onFocus={() => setFocusedInputIndex(null)}
                                value={taskInput}
                            />
                            {subTaskInputs.map((element: any, index) => {
                                return (
                                    <div className="subtask-input-container" key={`${index}_${element.task}_${Math.floor(Math.random() * 10000)}`}>
                                        <input
                                            autoFocus={focusedInputIndex === index}
                                            onChange={e => handleSubTaskInputChange(e, index)}
                                            placeholder="Sub task name"
                                            value={element.task}
                                            maxLength={100}
                                            onFocus={e => setFocusedInputIndex(index)}
                                            onBlur={e => {
                                                const deleteIcon = e.target.closest('div')?.querySelector('.delete-icon');
                                                if (deleteIcon) {
                                                    return;
                                                }
                                                setFocusedInputIndex(null);
                                            }}
                                        />

                                        <div className="delete-icon" onClick={() => deleteInput(index)}>
                                            <TbTrash size={25} color="white" />
                                        </div>
                                    </div>
                                );
                            })}
                            {subTaskInputs.length < 4 && (
                                <button type="button" onClick={addInput} className="another-slice">
                                    Add another slice <AiOutlinePlus size={35} color="#BFDBFE" />
                                </button>
                            )}

                            <button className="submit-btn" type="submit">
                                {task ? 'Update' : 'Add New Task'}
                            </button>
                        </form>
                    </div>
                    {showCalendar && (
                        <div className="show-calender">
                            <div className="calendar-container">
                                <Calendar date={date} onChange={handleSelectDateRange} color="#89CFF0" />
                                <span className="close" onClick={() => setShowCalendar(false)}>
                                    X
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Wrapper>
    );
};

export default AddNewTask;
