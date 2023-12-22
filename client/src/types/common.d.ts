export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface Task {
    _id: string;
    taskName: string;
    subTasks: SubTask[];
    createdBy: string;
    status: 'open' | 'in progress' | 'done';
    date: Date;
    estimatedTime: string;
    createdAt: Date;
    updatedAt: Date;
    orderIndex: number;
    loading?: boolean;
    subTaskLoading?: number;
}
export interface SubTask {
    task: string;
    done: boolean;
}
export interface TaskCount {
    date: string;
    taskCount: number;
}

export type Column = 'open' | 'in progress' | 'done';
