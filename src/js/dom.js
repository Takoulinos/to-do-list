export function addProject(project) {
    //add project
    const container = document.querySelector('.container');
    const newProject = document.createElement('div');
    container.appendChild(newProject);
    //title
    const title = document.createElement('h3');
    title.textContent = project.title;
    newProject.appendChild(title);
    //description
    const description = document.createElement('div');
    description.textContent = project.description;
    newProject.appendChild(description);
    //due date
    const due = document.createElement('div');
    due.textContent = project.dueDate;
    newProject.appendChild(due);
    //priority
    const priority = document.createElement('div');
    priority.textContent = project.priority;
    newProject.appendChild(priority);
    //tasks
    const tasks = document.createElement('div');
    tasks.textContent = project.tasks;
    newProject.appendChild(tasks);
}