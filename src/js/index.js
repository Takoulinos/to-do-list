import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Project, Task, projects } from './todos.js'
import { renderHeader, renderNavBar, renderProjects, renderAllTasks } from './dom.js';


renderHeader()
renderNavBar()
const def = new Project('default project');
projects.push(def)
renderAllTasks()
// addProject(def);
// addTask(task1)
