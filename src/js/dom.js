import Logo from '../images/logo.png'
import { projects } from './todos';
import { format } from 'date-fns'

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
    projects.classList.add('col',);
    projects.innerText = 'Projects';
    const tasks = document.createElement('div');
    tasks.classList.add('col')
    tasks.innerText = 'Tasks';
    const calendr = document.createElement('div');
    calendr.classList.add('col');
    calendr.innerText = 'Calendar';

    navBar.appendChild(projects);
    navBar.appendChild(tasks);
    navBar.appendChild(calendr);
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
            //add ststus
            const status = document.createElement('div');
            status.classList.add('col');
            status.textContent = task.status;
            newTask.appendChild(status);
            //append task
            contents.appendChild(newTask);
        })
    })
}