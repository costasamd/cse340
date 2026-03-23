import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage } from './categories.js';
import { errorTestPage } from './errors.js';
import { showOrganizationDetailsPage } from './organizations.js';
import { showProjectDatailsPage } from './projects.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDatailsPage);

// error-handling routes
router.get('/test-error', errorTestPage);

export default router;