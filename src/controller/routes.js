import express from 'express';

import { showHomePage } from './index.js';
import {
    showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm,
    showEditOrganizationForm, processNewOrganizationForm, organizationValidation, processEditOrganizationForm
} from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage,showCategoryDetailPage } from './categories.js';
import { errorTestPage } from './errors.js';
import { showProjectDatailsPage } from './projects.js';


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

//route to handle new organization submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation ,processEditOrganizationForm);

// error-handling routes
router.get('/test-error', errorTestPage);

export default router;