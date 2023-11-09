import React from 'react';
import Wrapper from '../assets/wrappers/Edit';
import { Task } from '../types/common';

const Edit: React.FC<{ task: Task }> = ({ task }) => {
    const updateTask = async () => {};
    return (
        <Wrapper>
            <div className="new-task-container">
                <h2>New Task</h2>
                <form action="" onSubmit={updateTask}>
                    <input type="text" value={task.taskName} />
                    {task.subTasks.map((task: any) => (
                        <input type="text" value={task} />
                    ))}
                    <button type="submit">Update</button>
                </form>
            </div>
        </Wrapper>
    );
};

export default Edit;
