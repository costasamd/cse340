import { getAllOrganizations, getOrganizationDetails, updateOrganization } from '../models/organization.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/new-organization.js';
import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('email')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations); this line test the information collection displaying it to the console

    const title = 'Our Partners Organizations';
    res.render('organizations', { title, organizations });

};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

const showEditOrganizationForm = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);

    const title = 'edit-organization';
    res.render('edit-organization', { title, organizationDetails });
};

const processNewOrganizationForm = async (req, res) => {
    //check for validation
    const results = validationResult(req);
    if (!results.isEmpty()) {
        //validation faild - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg); 
        });

        //redirect back to  new organization form
        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; //use the place holder logo for organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    //set a success flash message
    req.flash('success', 'organization added successfully!');
    
    res.redirect(`/organization/${organizationId}`)
};

const processEditOrganizationForm = async (req, res) => {

    const results = validationResult(req);
    if (!results.isEmpty()) {
        //validation failed loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        //redirect back to the edit page
        return res.redirect('/edit-organization/' + req.params.id);
    }

    const organizationId = req.params.id;
    const { name, description, email, logoFilename } = req.body;

    await updateOrganization(organizationId, name, description, email, logoFilename);

    //set flash msg
    req.flash('success', 'organization update successful');

    res.redirect(`/organization/${organizationId}`);
}


export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm };