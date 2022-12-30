import '../scss/styles.scss'
import * as bootstrap from 'bootstrap';
import { projects } from './todos.js';
import { renderHeader, renderNavBar, renderProjects, renderAllTasks, checkLocalStorage } from './dom.js';
import { format, parseISO, compareAsc } from 'date-fns';


renderHeader();
renderNavBar();
checkLocalStorage();
renderAllTasks();

