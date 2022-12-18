import { format } from 'date-fns'

export function addProject(project) {
    //add project
    const container = document.querySelector('.container');
    const newProject = document.createElement('div');
    newProject.classList.add('row')
    container.appendChild(newProject);
    //title
    const title = document.createElement('div');
    title.textContent = project.title;
    title.classList.add('col-md');
    newProject.appendChild(title);
    //description
    const description = document.createElement('div');
    description.textContent = project.description;
    description.classList.add('col-sm')
    newProject.appendChild(description);
    //due date
    const due = document.createElement('div');
    due.textContent = format(project.dueDate, 'dd/MM/yyyy');
    due.classList.add('col-sm');
    newProject.appendChild(due);
    //priority
    const priority = document.createElement('div');
    priority.textContent = project.priority;
    priority.classList.add('col-sm');
    newProject.appendChild(priority);
    //tasks
    const tasks = document.createElement('div');
    tasks.textContent = project.tasks;
    newProject.appendChild(tasks);
}