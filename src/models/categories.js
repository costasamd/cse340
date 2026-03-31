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

const createCategory = async (name, categoryId) => {
    const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id;
    `;

    const query_params = [name];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
    `;

    const query_params = [name, categoryId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }

    return result.rows[0].category_id;
}



export {displayCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignment, createCategory, updateCategory};