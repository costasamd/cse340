
import { getAllProjects, getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js'; 
import { getCategoryByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organization.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

const number_of_upcoming_projects = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(number_of_upcoming_projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDatailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetail = await getProjectDetails(projectId);
    const categoryTag = await getCategoryByProjectId(projectId);
    const title = 'Project Detail';
    res.render('project', { title, projectDetail, categoryTag })
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Create New Service Project';
    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //loop through errors and flash them to the user
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        //redirect back to the form with error messages
        return res.redirect('/new-project');
    }

    //extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        //create new project in database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }

}

export { showProjectsPage, showProjectDatailsPage, showNewProjectForm, processNewProjectForm, projectValidation };