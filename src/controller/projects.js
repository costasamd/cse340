
import { getAllProjects } from '../models/projects.js';

const number_of_upcoming_projects = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();

    const title = 'Service Projects'
    res.render('projects', { title, projects });
};

//team act... function

/*
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);

    const title = 'Project Details';

    res, render('project', { title });
}
    */

export { showProjectsPage };