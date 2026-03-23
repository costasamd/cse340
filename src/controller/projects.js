
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';



const number_of_upcoming_projects = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(number_of_upcoming_projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDatailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetail = await getProjectDetails(projectId);
    const title = 'Project Detail';

    res.render('project', { title, projectDetail })
};


export { showProjectsPage, showProjectDatailsPage };