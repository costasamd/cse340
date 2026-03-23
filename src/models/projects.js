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
          TO_CHAR(date, 'MONTH DD, YYYY') AS formatted_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
  SELECT
  sp.project_id,
  sp.organization_id,
  sp.title,
  sp.description,
  TO_CHAR(sp.date, 'MONTH DD, YYYY') AS formatted_date,
  sp.location,
  o.name
  FROM service_projects AS sp
  JOIN organization AS o
  ON sp.organization_id = o.organization_id
  WHERE sp.date >= CURRENT_DATE
  ORDER BY sp.date ASC
  LIMIT $1;
  `;
  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);

  return result.rows;

};

const getProjectDetails = async (id) => {
  const query = `
  SELECT
  sp.project_id,
  sp.title,
  sp.description,
  TO_CHAR(sp.date, 'MONTH DD, YYYY') AS formatted_date,
  sp.location,
  o.name,
  o.organization_id
  FROM service_projects AS sp
  JOIN organization AS o
  ON sp.organization_id = o.organization_id
  WHERE sp.project_id = $1;
  `;

  const query_params = [id];
  const result = await db.query(query, query_params);

  return result.rows.length > 0 ? result.rows[0] : null;

}



export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };