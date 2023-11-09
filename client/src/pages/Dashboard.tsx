import React, { Suspense, useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/Dashboard';
import Navbar from '../components/Navbar';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';
import axios from 'axios';
import customToast, { ERRORS } from '../components/customToast';
import moment from 'moment';
import { Task, TaskCount } from '../types/common';
import TaskCard from '../components/TaskCard';
import AddNewTask from '../components/AddNewTask';
import { selectTasks, setTasks } from '../redux/slices/tasks';
import { DateRangePicker, DefinedRangeProps, Preview, Range, defaultStaticRanges } from 'react-date-range';

import { format } from 'date-fns';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Loading from '../components/Loading';

const Dashboard = () => {
    const { userName, accessToken } = useAppSelector(selectAuth);
    const [showCalendar, setShowCalendar] = useState(false);
    const [taskCounts, setTaskCounts] = useState<TaskCount[]>([]);
    const [editTaskModuleOpen, setEditTaskModuleOpen] = useState(false);
    const [showDeleteModule, setShowDeleteModule] = useState(false);
    const [updateId, setUpdateId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [showLoadingTasksSpinner, setShowLoadingTasksSpinner] = useState(false);
    const [showLoadingTaskCountsSpinner, setShowLoadingTaskCountsSpinner] = useState(false);
    const [showDeleteSpinner, setShowDeleteSpinner] = useState(false);
    // const [cardOpen, setCardOpen] = useState(false);
    const [cardStates, setCardStates] = useState({});
    // const [tasks, setTasks] = useState<Task[]>();
    const tasks = useAppSelector(selectTasks);
    console.log(tasks);
    const { isAuthenticated, email } = useAppSelector(selectAuth);

    const dispatch = useAppDispatch();
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(new Date(new Date().setHours(new Date().getHours() + 3)).setUTCHours(0, 0, 0, 0)),
        endDate: new Date(new Date(new Date().setHours(new Date().getHours() + 3)).setUTCHours(0, 0, 0, 0)),
        key: 'selection',
    });
    const startDateString = selectionRange.startDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const endDateString = selectionRange.endDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const customStaticRanges = [
        {
            range: (props?: DefinedRangeProps): Preview => ({
                startDate: new Date(),
                endDate: new Date(),
                // key: 'today',
                ...props,
            }),
            isSelected: (range: Range): boolean => range.startDate?.toISOString() === new Date().toISOString(),
            label: 'Today',
        },
        {
            range: (props?: DefinedRangeProps): Preview => ({
                startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                endDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                // key: 'yesterday',
                ...props,
            }),
            isSelected: (range: Range): boolean => range.startDate?.toISOString() === new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
            label: 'Yesterday',
        },
    ];

    // Filter out the default static ranges that you want to exclude
    const filteredDefaultStaticRanges = defaultStaticRanges.filter(defaultRange => !['Today', 'Yesterday'].includes(defaultRange.label!));

    // Combine filteredDefaultStaticRanges with customStaticRanges
    const allStaticRanges = [...customStaticRanges, ...filteredDefaultStaticRanges];

    const handleSelectRange = (ranges: any) => {
        setShowCalendar(false);
        const hoursToAdd = 3;
        ranges.selection.endDate.setHours(ranges.selection.endDate.getHours() + hoursToAdd);
        setSelectionRange(ranges.selection);
    };

    const fetchTaskCounts = async () => {
        //TODO: if we want to send a request for current month
        // const today = new Date(); // Get the current date
        // const firstDayOfMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
        // const lastDayOfMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0));
        // const formattedFirstDayOfThisMonth = moment(firstDayOfMonth).format('YYYY-MM-DD');
        // const formattedLastDayOfThisMonth = moment(lastDayOfMonth).format('YYYY-MM-DD');

        setShowLoadingTaskCountsSpinner(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/taskCount/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { taskCounts } = response.data.taskCounts;
            console.log(taskCounts);

            setTaskCounts(
                taskCounts.map((item: any) => {
                    return { date: item.date, taskCount: item.taskCount };
                })
            );
            setShowLoadingTaskCountsSpinner(false);
        } catch (error: any) {
            setShowLoadingTaskCountsSpinner(false);
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');
        }
    };
    console.log(taskCounts);
    const handleSelectDate = async () => {
        setShowLoadingTasksSpinner(true);
        const formattedDate = [moment(selectionRange.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(selectionRange.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')];
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/tasks/get',
                { date: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            let formattedTasks = [];
            if (response.data.tasks.length > 0) {
                formattedTasks = response.data.tasks;
            }
            const orderedTasks = formattedTasks.sort((a: Task, b: Task) => a.orderIndex - b.orderIndex);
            dispatch(setTasks(orderedTasks));

            if (response.data.totalTasks > 0) {
                if (startDateString === endDateString) {
                    customToast(`Tasks loading for ${startDateString}`, 'success');
                } else {
                    customToast(`Tasks loading for ${startDateString} - ${endDateString}`, 'success');
                }
            } else {
                if (startDateString === endDateString) {
                    customToast(`No task for ${startDateString}`, 'error');
                } else {
                    customToast(`No task for ${startDateString} - ${endDateString}`, 'error');
                }
            }
            setShowLoadingTasksSpinner(false);
        } catch (error: any) {
            setShowLoadingTasksSpinner(false);
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');

            console.error(error);
        }
    };

    const isLoadingTaskCard = tasks.find(task => task.loading === true);
    const mount = useRef(false);
    useEffect(() => {
        if (!mount.current) {
            mount.current = true;
            return;
        }
        handleSelectDate();
    }, [selectionRange]);

    const handleTaskCounts = (action: 'decrement' | 'increment', date: string) => {
        if (action !== 'decrement' && action !== 'increment') {
            return;
        }
        console.log(date);

        if (action === 'increment') {
            const taskCountObject = taskCounts.find(item => item.date === date);
            if (taskCountObject) {
                setTaskCounts(prev => {
                    return prev.map(item => (item.date === date ? { ...item, taskCount: item.taskCount + 1 } : item));
                });
            } else {
                setTaskCounts(prev => [...prev, { date: date, taskCount: 1 }]);
            }
        } else if (action === 'decrement') {
            const taskCountObject = taskCounts.find(item => item.date === date);
            if (!taskCountObject) {
                return;
            } else if (taskCountObject.taskCount > 1) {
                setTaskCounts(prev => prev.map(item => (item.date === date ? { ...item, taskCount: item.taskCount - 1 } : item)));
            } else {
                setTaskCounts(prev => prev.filter(item => item.date !== date));
            }
        }
    };
    console.log(taskCounts, 'taskCounts || dashboard');

    function customDayContent(day: Date) {
        let extraDot = null;
        const date = moment(day).format('YYYY-MM-DD');
        const matchingTask = taskCounts.find((task: TaskCount) => moment(task.date).format('YYYY-MM-DD') === date);

        if (matchingTask) {
            extraDot = (
                <div
                    style={{
                        position: 'absolute',
                        top: -12,
                        right: 6,
                    }}
                >
                    {matchingTask.taskCount}
                </div>
            );
        }

        return (
            <div>
                {matchingTask && extraDot}
                <span>{format(day, 'd')}</span>
            </div>
        );
    }

    let columns = ['open', 'in progress', 'done'];

    function convertTasks(tasks: Task[]) {
        // Create an empty array to store the converted tasks
        const convertedTasks = [];

        // Loop through each task in the tasks array
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            // Create a new object for the converted task
            const convertedTask = {
                _id: task._id,
                orderIndex: i, // Use the current index as the orderIndex
            };

            // Add the converted task to the convertedTasks array
            convertedTasks.push(convertedTask);
        }

        // Return the convertedTasks array as JSON
        return convertedTasks;
    }

    function updateOrderIndexes(targetsInColumn: Task[], updatedTasks: any) {
        return targetsInColumn.map(targetTask => {
            const updatedTask = updatedTasks.find((updated: any) => updated._id === targetTask._id);
            return updatedTask ? { ...targetTask, orderIndex: updatedTask.orderIndex } : targetTask;
        });
    }

    const handleDragEnd = async (result: any) => {
        if (isLoadingTaskCard) {
            customToast(ERRORS.ONGOING_PROCESS, 'error');
            return;
        }
        if (email === 'testUser@gmail.com') {
            customToast('Test User. Read Only!', 'error');
            return;
        }
        try {
            const {
                source,
                source: { droppableId: sourceDroppableId },
                destination,
                destination: { droppableId: targetDroppableId },
            } = result;

            if (sourceDroppableId !== targetDroppableId) {
                return;
            }

            if (!destination) {
                return;
            }

            if (source.index === destination.index) {
                return;
            }

            const tasksInTargetColumn = tasks.filter(task => task.status === targetDroppableId);
            const tasksNotInTargetColumn = tasks.filter(task => task.status !== targetDroppableId);

            const draggedTask = tasksInTargetColumn[source.index];

            tasksInTargetColumn.splice(source.index, 1);

            tasksInTargetColumn.splice(destination.index, 0, draggedTask);

            const updatedTasks = convertTasks(tasksInTargetColumn);

            const orderUpdatedTasksInColumn = updateOrderIndexes(tasksInTargetColumn, updatedTasks);
            dispatch(setTasks([...tasksNotInTargetColumn, ...orderUpdatedTasksInColumn]));

            const response = await axios.patch(
                `http://localhost:3000/api/v1/tasks/order`,
                { updatedTasks },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error: any) {
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');
            console.error(error);
        }
    };

    // const handleDragStart = (result: any) => {
    //     console.log('handleDragStart | result', result);
    //     const {
    //         source,
    //         source: { droppableId: sourceDroppableId },
    //         draggableId,
    //     } = result;
    //     // const tasksInTargetColumn = tasks.filter(task => task.status === targetDroppableId);
    //     //     const tasksNotInTargetColumn = tasks.filter(task => task.status !== targetDroppableId);

    //     const filteredTasks = tasks.filter(task => task._id !== draggableId);
    //     dispatch(setTasks(filteredTasks));
    // };
    const toggleCardOpen = (cardId: string) => {
        setCardStates((prevState: any) => ({
            ...prevState,
            [cardId]: !prevState[cardId],
        }));
    };
    const handleDelete = async (taskId: string, date: Date) => {
        setShowDeleteModule(false);
        if (isLoadingTaskCard) {
            customToast(ERRORS.ONGOING_PROCESS, 'error');
            return;
        }
        dispatch(setTasks(tasks.map((el: any) => (el._id === taskId ? { ...el, loading: true } : el))));
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            dispatch(setTasks(tasks.filter((el: any) => el._id !== taskId)));
            handleTaskCounts('decrement', date.toISOString());
            console.log(response, 'response delete');
        } catch (error: any) {
            dispatch(setTasks(tasks.map((el: any) => (el._id === taskId ? { ...el, loading: false } : el))));
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');
            console.error(error);
        }
    };
    const handleShowDeleteModule = (taskId: string) => {
        dispatch(setTasks(tasks.map((el: any) => (el._id === taskId ? { ...el, loading: false } : el))));
        setShowDeleteModule(true);
        setDeleteId(taskId);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Wrapper>
                <Navbar name={userName} />
                <div className="top">
                    <div className="calendar">
                        <div
                            onClick={() => {
                                setShowCalendar(prev => !prev);
                                if (taskCounts.length === 0) {
                                    fetchTaskCounts();
                                }
                            }}
                        >
                            <AiTwotoneCalendar color="#3B82F6" size={35} />
                        </div>
                        <p>{startDateString === endDateString ? startDateString : `${startDateString} - ${endDateString}`}</p>
                        {showCalendar && (
                            <div className="show-calendar">
                                {showLoadingTaskCountsSpinner ? (
                                    <div className="calendar-spinner-container">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div className="calendar-container">
                                        <DateRangePicker
                                            staticRanges={allStaticRanges}
                                            rangeColors={['#89CFF0']}
                                            className="date-picker"
                                            ranges={[selectionRange]}
                                            onChange={handleSelectRange}
                                            dayContentRenderer={customDayContent}
                                        />
                                        <span className="close" onClick={() => setShowCalendar(false)}>
                                            X
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="new-task-container">
                        <AddNewTask startDate={selectionRange.startDate} endDate={selectionRange.endDate} handleTaskCounts={handleTaskCounts} />
                        {editTaskModuleOpen && (
                            <AddNewTask
                                handleTaskCounts={handleTaskCounts}
                                task={tasks.find((obj: any) => obj._id === updateId)}
                                startDate={selectionRange.startDate}
                                endDate={selectionRange.endDate}
                                setEditTaskModuleOpen={setEditTaskModuleOpen}
                                setUpdateId={setUpdateId}
                            />
                        )}
                    </div>
                </div>
                <div className="board">
                    {columns.map((columnId: string) => {
                        return (
                            <Droppable key={`${columnId}_${Math.floor(Math.random() * 1000)}`} droppableId={columnId} type="column">
                                {provided => (
                                    <div id={columnId} {...provided.droppableProps} ref={provided.innerRef} className="task-column">
                                        <div className="heading-container">
                                            <h2 className="column-heading">{columnId}</h2>
                                            <div className="info-sticker">
                                                {tasks?.filter((obj: any) => obj.status === columnId).length} {tasks?.filter((obj: any) => obj.status === columnId).length > 1 ? 'tasks' : 'task'}{' '}
                                                {tasks
                                                    ?.filter((task: any) => task.status === columnId)
                                                    .reduce((accumulator, currentValue) => accumulator + (parseFloat(currentValue.estimatedTime) || 0), 0)}{' '}
                                                hours
                                            </div>
                                        </div>

                                        {showLoadingTasksSpinner ? (
                                            <Loading />
                                        ) : (
                                            tasks
                                                .filter(task => task.status === columnId)
                                                .map((task, index) => {
                                                    return (
                                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <TaskCard
                                                                        handleShowDeleteModule={handleShowDeleteModule}
                                                                        cardStates={cardStates}
                                                                        toggleCardOpen={toggleCardOpen}
                                                                        refProp={provided.innerRef}
                                                                        draggableProps={provided.draggableProps}
                                                                        dragHandleProps={provided.dragHandleProps}
                                                                        setEditTaskModuleOpen={setEditTaskModuleOpen}
                                                                        setUpdateId={setUpdateId}
                                                                        key={task._id}
                                                                        task={task}
                                                                        dashboardDate={selectionRange.startDate}
                                                                    />
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })
                                        )}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
                {showDeleteModule && (
                    <div className="delete-module">
                        <div className="delete-module-container">
                            <p>Are you sure to delete this task?</p>
                            <div className="buttons">
                                <button className="yes-btn" onClick={() => handleDelete(deleteId, selectionRange.startDate)}>
                                    Yes
                                </button>
                                <button className="no-btn" onClick={() => setShowDeleteModule(false)}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Wrapper>
        </DragDropContext>
    );
};

export default Dashboard;
