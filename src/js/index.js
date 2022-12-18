import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Project } from './todos.js'
import { addProject } from './dom';

const def = new Project('default', 'asdf', new Date(), 'relaxed', [1,2,3]);
addProject(def)
