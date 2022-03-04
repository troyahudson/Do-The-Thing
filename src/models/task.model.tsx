import { v4 as uuid } from 'uuid';

export class Task {

    id?: string;
    name: string = '';
    description?: string;
    priority?: number = Task.PRIORITY.HIGH;
    status?: string = Task.STATUS.TO_DO;
    complexity?: number;
    
    createdByUserId?: string;
    assignedToUserId?: string;
    assignedToUserName?: string;
    projectId?: string;
    parentTaskId?: string;
    subTasks?: Task[] = [];

    dateCreated?: Date;
    dateStarted?: Date;
    dateCompleted?: Date;

    public static readonly STATUS = {
        TO_DO: "To Do",
        IN_PROGRESS: "In Progress",
        COMPLETE: "Done"
    }

    public static readonly PRIORITY = {
        VERY_LOW: 0,
        LOW: 1,
        HIGH: 2,
        VERY_HIGH: 3,
    }

    constructor(obj: Task) {
        Object.assign(this, obj);
        
        if (!this.id) {
            this.id = uuid();
        };

        if (!this.dateCreated) {
            this.dateCreated = new Date()
        };
        
        this.subTasks = [];
        if (obj.subTasks) {
            for (let task of obj.subTasks) {
                this.subTasks.push(new Task(task));
            }
        };
    }
    
    checkIfSubTasksComplete?(): boolean {
        if(this.subTasks){for (let task of this.subTasks) {
            if (task.status !== Task.STATUS.COMPLETE) {
                return false;  
            }
        }}
        return true;
    }


    markComplete?(): boolean {
        if (this.checkIfSubTasksComplete()) {
            this.status = Task.STATUS.COMPLETE;
            this.dateCompleted = new Date();
            return true;
        }
        return false;
    }

}

