import db from './db.js';

const getAllProjects = async () => {
    const query = `
    SELECT service_projects.organization_id, service_projects.title, service_projects.description, TO_CHAR(service_projects.date, 'Month DD, YYYY') AS date, organization.name
    FROM service_projects
    INNER JOIN organization
    ON service_projects.organization_id = organization.organization_id; 
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects}