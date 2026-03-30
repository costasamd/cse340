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

const assingCategoryToProject = async (projectId, categoryId) => {
    const query = `
    INSERT INTO project_cat (project_id, category_id)
    VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignment = async (projectId, categoryIds) => {
    //First remove existing category assignment for the project
    const deleteQuery = `
    DELETE FROM project_cat
    WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    //test the passing data
    console.log('categoryIds:', categoryIds);
    console.log('type:', typeof projectId);
    //Then assign the new category to the project
    for (const categoryId of categoryIds) {
        await assingCategoryToProject(projectId, categoryId);
    }
};

export {displayCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignment}