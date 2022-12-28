import Logo from '../images/logo.png';
import { projects, Task, Project } from './todos';
import { format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

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
    navBar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');
    container.appendChild(navBar);
    const navContainer = document.createElement('div');
    navContainer.classList.add('container', 'navbar-nav', 'justify-content-around');
    navBar.appendChild(navContainer);

    const projects = document.createElement('div');
    projects.classList.add('projects', 'nav-link');
    projects.textContent = 'Projects';
    const tasks = document.createElement('div');
    tasks.classList.add('tasks', 'nav-link')
    tasks.textContent = 'Tasks';
    const calendar = document.createElement('div');
    calendar.classList.add('calendar', 'nav-link');
    calendar.textContent = 'Calendar';

    navContainer.appendChild(projects);
    navContainer.appendChild(tasks);
    navContainer.appendChild(calendar);

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

    //button to bring up form
    const addNewProject = document.createElement('button');
    addNewProject.textContent = 'Add new project';
    setAttributes(addNewProject, {'class': 'btn btn-primary', 'type':'button', 'data-bs-toggle':'collapse', 'data-bs-target':'#collapseForm', 'aria-expanded':'false', 'aria-controls':'collapseForm'});
    contents.appendChild(addNewProject);

    //form for adding new project
    const collapseForm = document.createElement('form');
    setAttributes(collapseForm, {'class':'collapse row', 'id':'collapseForm'});
    contents.appendChild(collapseForm);
    //project name
    const newProject = document.createElement('div');
    newProject.classList.add('col');
    const label = document.createElement('label');
    setAttributes(label, {'class':'form-label', 'for':'inputProject'});
    label.textContent = 'Project Title';
    newProject.appendChild(label);
    const projectInput = document.createElement('input');
    setAttributes(projectInput, {'class':'form-control', 'id':'inputProject', 'type':'text'});
    newProject.appendChild(projectInput);
    collapseForm.appendChild(newProject);
    //buttons
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
        const newProject = new Project(
            document.querySelector('#inputProject').value,
            uuidv4(),
        );
        return addProject(newProject);
    });

    //render every project accordion style
    const accordion = document.createElement('div');
    setAttributes(accordion, {'class':'accordion', 'id':'accordionPanelsStayOpenExample'});
    contents.appendChild(accordion);
    projects.forEach(project => {
        const newProject = document.createElement('div');
        setAttributes(newProject, {'class':'accordion-item', 'data-id':`${project.id}`});
        accordion.appendChild(newProject);
        const title = document.createElement('h2');
        setAttributes(title, {'class':'accordion-header', 'id':`panelsStayOpen-heading${project.id}`});
        newProject.appendChild(title);
        const button = document.createElement('button');
        setAttributes(button, {'class':'accordion-button', 'type':'button', 'data-bs-toggle':'collapse', 'data-bs-target':`#panelsStayOpen-collapse${project.id}`,'aria-expanded':'true', 'aria-controls':`panelsStayOpen-collapse${project.id}` })
        button.textContent = project.title;
        title.appendChild(button);
        const accordionCollapse = document.createElement('div');
        setAttributes(accordionCollapse, {'id':`panelsStayOpen-collapse${project.id}`, 'class':'accordion-collapse collapse show', 'aria-labelledby':`panelsStayOpen-heading${project.id}`});
        newProject.appendChild(accordionCollapse);
        const accordionBody = document.createElement('div');
        setAttributes(accordionBody, {'class':'accordion-body'});
        accordionCollapse.appendChild(accordionBody);
        const taskList = document.createElement('ul');
        setAttributes(taskList, {'class':'list-group container'});
        accordionBody.appendChild(taskList);
        project.tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            taskList.appendChild(listItem);
            const name = document.createElement('div');
            name.textContent = task.title;
            listItem.appendChild(name);
            const date = document.createElement('div');
            date.textContent = format(task.dueDate, 'dd/MM/yyyy');
            listItem.appendChild(date);
            const priority = document.createElement('div');    
            priority.textContent = task.priority;
            listItem.appendChild(priority);
            const status = createStatusDropdown(task);
            listItem.appendChild(status);
        })
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
    //project name
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
            uuidv4(),
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
            setAttributes(removeButton, {'class':'btn btn-danger remove-task', 'data-id':`${task.id}`})
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
    return renderAllTasks();
}

function addProject(project) {
    projects.push(project)
    return renderProjects()
}

function removeTask(e) {
    const id = e.target.getAttribute('data-id');
    let found = false;
    for (let i = 0; i<projects.length; i++) {
        for (let j=0; j<projects[i].tasks.length; j++) {
            if (projects[i].tasks[j].id === id) {
                projects[i].tasks.splice(j, 1);
                found = true;
            }
            if(found===true) {break};
        }
        if(found===true) {break};
    }
    renderAllTasks();
}

function createStatusDropdown(task) {
    const div = document.createElement('div');
    setAttributes(div, {'class':'dropdown'});
    const button = document.createElement('button');
    setAttributes(button, {'class':'btn btn-secondary dropdown-toggle', 'type':'button', 'data-bs-toggle':'dropdown', 'aria-expanded':'false'});
    button.textContent = task.status;
    div.appendChild(button);
    const list = document.createElement('ul');
    setAttributes(list, {'class':'dropdown-menu'});
    div.appendChild(list);
    const notStarted = document.createElement('li');
    const inProgress = document.createElement('li');
    const finished = document.createElement('li');
    list.appendChild(notStarted);
    list.appendChild(inProgress);
    list.appendChild(finished);
    const notStartedLink = document.createElement('a');
    const inProgressLink = document.createElement('a');
    const finishedLink = document.createElement('a');
    setAttributes(notStartedLink, {'class':'dropdown-item', 'href':'#'});
    setAttributes(inProgressLink, {'class':'dropdown-item', 'href':'#'});
    setAttributes(finishedLink, {'class':'dropdown-item', 'href':'#'});
    notStartedLink.textContent = 'Not started yet';
    inProgressLink.textContent = 'In Progress';
    finishedLink.textContent = 'Finished';
    notStarted.appendChild(notStartedLink);
    inProgress.appendChild(inProgressLink);
    finished.appendChild(finishedLink);
    notStarted.addEventListener('click', () => {
        task.status = 'Not started yet';
        button.textContent = 'Not started yet';
        button.classList.remove('btn-warning', 'btn-success');
        button.classList.add('btn-secondary');
    });
    inProgress.addEventListener('click', () => {
        task.status = 'In progress';
        button.textContent = 'In progress';
        button.classList.remove('btn-secondary', 'btn-success');
        button.classList.add('btn-warning');
    });
    finished.addEventListener('click', () => {
        task.status = 'Finished';
        button.textContent = 'Finished';
        button.classList.remove('btn-secondary', 'btn-warning');
        button.classList.add('btn-success');
    });

    return div;
}