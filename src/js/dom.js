import Logo from '../images/logo.png'
import { projects, Task } from './todos';
import { format, parseISO } from 'date-fns'

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

export function renderHeader() {
    const header = document.createElement('div');
    header.classList.add('row', 'text-center');
    header.setAttribute('id', 'header');
    container.appendChild(header);

    const logo = new Image();
    logo.src = Logo;
    logo.classList.add('col-2', 'logo');
    header.appendChild(logo);

    const title = document.createElement('h1');
    title.textContent = 'To-Do-List';
    title.classList.add('col');
    header.appendChild(title);
}

export function renderNavBar() {
    const navBar = document.createElement('div');
    navBar.classList.add('nav', 'row');
    container.appendChild(navBar);

    const projects = document.createElement('div');
    projects.classList.add('col', 'projects');
    projects.innerText = 'Projects';
    const tasks = document.createElement('div');
    tasks.classList.add('col', 'tasks')
    tasks.innerText = 'Tasks';
    const calendar = document.createElement('div');
    calendar.classList.add('col','calendar');
    calendar.innerText = 'Calendar';

    navBar.appendChild(projects);
    navBar.appendChild(tasks);
    navBar.appendChild(calendar);

    addGlobalEventListener('click', '.projects',renderProjects)

    addGlobalEventListener('click', '.tasks', renderAllTasks)
}

function clearPage() {
    let contents = document.querySelector('.contents');
    if(contents) {
        while (contents.firstChild) {
            contents.removeChild(contents.firstChild);
        }
    }
    else {
        contents = document.createElement('div');
        contents.classList.add('contents', 'container');
        body.appendChild(contents);
    }
}

export function renderProjects() {
    clearPage();
    const contents = document.querySelector('.contents');
    projects.forEach(project => {
        const newProject = document.createElement('div');
        newProject.classList.add('row');
        newProject.setAttribute('id', `${project.title}`);
        contents.appendChild(newProject);
        const title = document.createElement('div');
        title.textContent = project.title;
        title.classList.add('col');
        newProject.appendChild(title);
    })
}

export function renderAllTasks() {
    clearPage();
    const contents = document.querySelector('.contents');
    //this is the bar with whe collumn names just above the task list
    const columnNames = document.createElement('div');
    columnNames.classList.add('row');
    contents.appendChild(columnNames);
    const task = document.createElement('div');
    task.classList.add('col');
    task.textContent = 'Task';
    columnNames.appendChild(task);
    const dueDate = document.createElement('div');
    dueDate.classList.add('col');
    dueDate.textContent = 'Due Date';
    columnNames.appendChild(dueDate);
    const priority = document.createElement('div');
    priority.classList.add('col');
    priority.textContent = 'Priority';
    columnNames.appendChild(priority);
    const status = document.createElement('div');
    status.classList.add('col');
    status.textContent = 'Status';
    columnNames.appendChild(status);

    //button to bring up the form
    const addNewTask = document.createElement('button');
    addNewTask.textContent = 'Add new task';
    setAttributes(addNewTask, {'class': 'btn btn-primary', 'type':'button', 'data-bs-toggle':'collapse', 'data-bs-target':'#collapseForm', 'aria-expanded':'false', 'aria-controls':'collapseForm'});
    contents.appendChild(addNewTask);

    //form for adding a new task
    const collapseForm = document.createElement('form');
    setAttributes(collapseForm, {'class':'collapse row', 'id':'collapseForm'});
    contents.appendChild(collapseForm);

    const newTask = document.createElement('div');
    newTask.classList.add('col');
    const taskLabel = document.createElement('label');
    setAttributes(taskLabel, {'class':'form-label', 'for':'inputTask'});
    taskLabel.textContent = 'Title';
    newTask.appendChild(taskLabel);
    const taskInput = document.createElement('input');
    setAttributes(taskInput, {'class':'form-control', 'id':'inputTask', 'type':'text'});
    newTask.appendChild(taskInput);
    collapseForm.appendChild(newTask);

    const newDate = document.createElement('div');
    newDate.classList.add('col');
    const dateLabel = document.createElement('label');
    setAttributes(dateLabel, {'class':'form-label', 'for':'inputDate'});
    dateLabel.textContent = 'Due Date';
    newDate.appendChild(dateLabel);
    const dateInput = document.createElement('input');
    setAttributes(dateInput, {'class':'form-control', 'id':'inputDate', 'type':'date'});
    newDate.appendChild(dateInput);
    collapseForm.appendChild(newDate);

    const newPriority = document.createElement('div');
    newPriority.classList.add('col');
    const priorityLabel = document.createElement('label');
    setAttributes(priorityLabel, {'class':'form-label', 'for':'selectPriority'});
    priorityLabel.textContent = 'Priority';
    newPriority.appendChild(priorityLabel);
    const priotitySelect = document.createElement('select');
    setAttributes(priotitySelect, {'class':'form-select', 'id':'selectPriority'});
    const option0 = document.createElement('option');
    option0.textContent = 'Choose';
    option0.setAttribute('selected', '');
    priotitySelect.appendChild(option0);
    const option1 = document.createElement('option');
    option1.textContent = 'Low';
    option1.setAttribute('value', 'Low');
    priotitySelect.appendChild(option1);
    const option2 = document.createElement('option');
    option2.textContent = 'Medium';
    option2.setAttribute('value', 'Medium');
    priotitySelect.appendChild(option2);
    const option3 = document.createElement('option');
    option3.textContent = 'High';
    option3.setAttribute('value', 'High');
    priotitySelect.appendChild(option3);
    const option4 = document.createElement('option');
    option4.textContent = 'Urgent';
    option4.setAttribute('value', 'Urgent');
    priotitySelect.appendChild(option4);
    newPriority.appendChild(priotitySelect);
    collapseForm.appendChild(newPriority);

    const buttons = document.createElement('div');
    buttons.classList.add('col');
    const cancelButton = document.createElement('button');
    setAttributes(cancelButton, {'class':'btn btn-danger', 'type':'button'});
    cancelButton.textContent = 'Cancel';
    buttons.appendChild(cancelButton);
    const submitButton = document.createElement('button');
    setAttributes(submitButton, {'class':'btn btn-success', 'type':'button', 'id':'submit'});
    submitButton.textContent = 'Submit';
    buttons.appendChild(submitButton);
    collapseForm.appendChild(buttons);
    submitButton.addEventListener('click', function() {
        const newTask = new Task(
        document.querySelector('#inputTask').value,
        '',
        parseISO(document.querySelector('#inputDate').value),
        document.querySelector('#selectPriority').value
        );
        return addTask(newTask);
    });
    
    //for every project we go through every task and append it to the contents of the page
    projects.forEach(project => {
        project.tasks.forEach(task => {
            const newTask = document.createElement('div');
            newTask.classList.add('row');
            //add title
            const title = document.createElement('div');
            title.textContent = task.title;
            title.classList.add('col');
            newTask.appendChild(title);
            //add date
            const dueDate = document.createElement('div');
            dueDate.classList.add('col');
            dueDate.textContent = format(task.dueDate, 'dd/MM/yyyy');
            newTask.appendChild(dueDate);
            //add priority
            const priority = document.createElement('div');
            priority.classList.add('col');
            priority.textContent = task.priority;
            newTask.appendChild(priority);
            //add status
            const status = document.createElement('div');
            status.classList.add('col','d-flex','justify-content-between');
            status.textContent = task.status;
            const removeButton = document.createElement('buton');
            removeButton.classList.add('btn', 'btn-danger', 'remove-task');
            removeButton.textContent = 'remove';
            removeButton.addEventListener('click', removeTask);
            status.appendChild(removeButton);
            newTask.appendChild(status);
            //append task
            contents.appendChild(newTask);
        })
    })
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function addTask(task, project = projects[0]) {
    project.tasks.push(task);
    renderAllTasks();
}

function removeTask(e) {
    console.log(e.target);
}