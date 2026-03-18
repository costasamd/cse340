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
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    return result.rows;
};

//functons for detail page - team activity
/*
const getUpComingProjects = async (number_of_projects) => {
  const query = `
  SELECT
  project_id,
  organization_id,
  title,
  description,
  location,
  date,
  organization.name,
  FROM service_projects
  JOIN organization ON
  service_projects.organization_id = organization.organization_id
  WHERE organization_id = $1
  ORDER BY date;
  `;

  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
  SELECT
  project_id,
  organization_id,
  title,
  description,
  location,
  date,
  organization.name,
  FROM service_projects
  JOIN organization ON
  service_projects.organization_id = organization.organization_id
  WHERE organization_id = ${id}
  ORDER BY date;
  `;

  const query_params = [id];
  const result = await db.query(query, query_params);

  return result.rows;
}



*/
export { getAllProjects, getProjectsByOrganizationId };