import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Project, Task, projects } from './todos.js'
import { renderHeader, renderNavBar, renderProjects, renderAllTasks } from './dom.js';


renderHeader()
renderNavBar()
const def = new Project('default project');
const task1 = new Task('task 1', 'asdfasdf asdf as', new Date(), 'relaxed');
const task2 = new Task('task 1', 'asdfasdf asdf as', new Date(), 'relaxed');
def.tasks.push(task1);
def.tasks.push(task2);
projects.push(def)
renderAllTasks()
// addProject(def);
// addTask(task1)
