import { displayCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignment, createCategory } from '../models/categories.js';
import { getProjectsByCategory, getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
]

const showCategoriesPage = async (req, res) => {
    const categories = await displayCategories();

    const title = ' Services Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetail = await getCategoryById(categoryId);
    const projectsCat = await getProjectsByCategory(categoryId);
    const title = 'Category';

    res.render('category', { title, categoryDetail, projectsCat });
};

const showAssingCategoryForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await displayCategories();
    const assignedCategories = await getCategoryByProjectId(projectId);

    const title = 'Assign Category to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });

};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoriesIds || [];

    //ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignment(projectId, categoryIdsArray);
    req.flash('success', 'categories updated successfully');

    res.redirect(`/project/${projectId}`);
};

//controller to create new category and controller to process the new category

const showNewCategoryForm = async (req, res) => {
    const categories = await displayCategories();
    const title = 'Create New Category';

    res.render('new-category', { title, categories });

};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //loop through errors and flash them to user
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        //redirect back to the form page with error messages
        return res.redirect('/new-category');
    }

    //extract category name from req.body
    const { name } = req.body;

    try {
        //create new category in database
        const newCategoryId = await createCategory(name);

        req.flash('success', 'New category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    }
    catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }

};


export { showCategoriesPage, showCategoryDetailPage, showAssingCategoryForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, categoryValidation };