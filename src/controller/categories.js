import { displayCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await displayCategories();

    const title = ' Services Categories';
    res.render('categories', { title, categories });
};

export { showCategoriesPage };