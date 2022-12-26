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
    constructor (title) {
        this.title = title;
        this.tasks = [];
    }
}

export const projects = [];