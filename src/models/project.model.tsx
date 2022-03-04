import { Task } from "./task.model";
import { v4 as uuid } from 'uuid';


export class Project {
    
    id?: string;
    name: string = '';
    description?: string;
    orgId: string = '';
    dateCreated?: Date;
    dateStarted?: Date;
    dateCompleted?: Date;
    status?: string = Task.STATUS.TO_DO;
    tasks?: Task[] = [];

    constructor(obj: Project) {
        Object.assign(this, obj);
        
        if (!this.id) {
            this.id = uuid();
        };

        if (!this.dateCreated) {
            this.dateCreated = new Date()
        };
        
        this.tasks = [];
        if (obj.tasks) {
            for (let task of obj.tasks) {
                this.tasks.push(new Task(task));
            }
        };
    }

    markComplete?():boolean {
        if (this.checkIfProjectTasksComplete()) {
            this.status = Task.STATUS.COMPLETE;
            this.dateCompleted = new Date();
            return true;
        }
        return false;
    }

    checkIfProjectTasksComplete?(): boolean {
        if (this.tasks) {
            for (let task of this.tasks) {
                if (task.status !== Task.STATUS.COMPLETE) {
                return false;
                }
            }
        }
        return true;
    }

}