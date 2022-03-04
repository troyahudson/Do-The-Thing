import { User } from "./user.model";
import { v4 as uuid } from 'uuid';


export class Organization {
    
    id?: string;
    name: string ='';
    members: User[];

    constructor(obj: Organization) {
        Object.assign(this, obj);
        
        if (!this.id) {
            this.id = uuid();
        };

        this.members = [];
        if (obj.members) {
            for (let member of obj.members) {
                this.members.push(new User(member));
            }
        };

    }

}