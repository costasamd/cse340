import db from './db.js';

const displayCategories = async () => {
    const query = `
    SELECT category_id, name
    FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {displayCategories}