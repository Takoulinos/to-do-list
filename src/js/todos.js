export class Task {
    constructor (id, title, description, dueDate, priority, status = 'Not started yet') {
        this.id =  id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
}

export class Project {
    constructor (title, id) {
        this.title = title;
        this.id = id;
        this.tasks = [];
    }
}

const def = new Project('default project', 'default');
export const projects = [def];