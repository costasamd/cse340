import { displayCategories, getCategoryById, getCategoryByProjectId } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await displayCategories();

    const title = ' Services Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetail = await getCategoryById(categoryId);
    const projectsCat = await getCategoryByProjectId(categoryId);
    const title = 'Category';

    res.render('category', { title, categoryDetail, projectsCat });
};

export { showCategoriesPage, showCategoryDetailPage };