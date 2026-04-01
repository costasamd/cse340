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
    processLoginForm, processLogout, showDashboard, requireLogin, requireRole
} from './users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDatailsPage);
router.get('/category/:id', showCategoryDetailPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssingCategoryForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.get('/login', showLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);


//route to handle new organization submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);

// error-handling routes
router.get('/test-error', errorTestPage);

export default router;