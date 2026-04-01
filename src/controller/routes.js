import express from 'express';

import { showHomePage } from './index.js';
import {
    showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm,
    showEditOrganizationForm, processNewOrganizationForm, organizationValidation, processEditOrganizationForm
} from './organizations.js';
import { showProjectsPage, showProjectDatailsPage ,showNewProjectForm, projectValidation ,processNewProjectForm, showEditProjectForm, processEditProjectForm } from './projects.js';
import { showCategoriesPage,showCategoryDetailPage, showAssingCategoryForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, categoryValidation, showEditCategoryForm ,processEditCategoryForm } from './categories.js';
import { errorTestPage } from './errors.js';
import {
    showUserRegistrationForm, processUserRegistrationForm, showLoginForm,
    processLoginForm, processLogout, showDashboard, requireLogin
} from './users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDatailsPage);
router.get('/category/:id', showCategoryDetailPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.get('/assign-categories/:projectId', showAssingCategoryForm);
router.get('/edit-project/:id', showEditProjectForm);
router.get('/new-category', showNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.get('/login', showLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);


//route to handle new organization submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation ,processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.post('/edit-project/:id', processEditProjectForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);

// error-handling routes
router.get('/test-error', errorTestPage);

export default router;