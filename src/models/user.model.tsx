import { v4 as uuid } from 'uuid';


export class User {
    
    id?: string = '';
    email: string = '';
    password: string = '';
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    orgId?: string = '';

    constructor(obj: User) {

        Object.assign(this, obj);
        
        if (!this.id) {
            this.id = uuid();
        };
    }

}