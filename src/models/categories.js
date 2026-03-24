import db from './db.js';

const displayCategories = async () => {
    const query = `
    SELECT category_id, name
    FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
    SELECT
    category_id,
    name
    FROM public.categories
    WHERE category_id = $1;
    `;

    const query_params = [categoryId];
    const result = await db.query(query, query_params);

    return result.rows.length > 0 ? result.rows[0] : NULL;

};

const getCategoryByProjectId = async (projectId) => {
    const query = `
    SELECT
    ct.category_id,
    ct.name,
    p.project_id,
    p.title
    FROM categories AS ct
    JOIN project_cat AS pc
    ON ct.category_id = pc.category_id
    JOIN service_projects AS p
    ON p.project_id = pc.project_id
    WHERE p.project_id = $1;
    `;
 
    const query_params = [projectId];
    const result = await db.query(query, query_params);

    return result.rows;
};

export {displayCategories, getCategoryById, getCategoryByProjectId}