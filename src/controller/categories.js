import { displayCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignment } from '../models/categories.js';
import { getProjectsByCategory, getProjectDetails } from '../models/projects.js';

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
}


export { showCategoriesPage, showCategoryDetailPage, showAssingCategoryForm, processAssignCategoriesForm };