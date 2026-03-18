import { getAllOrganizations, getOrganizationDetails } from '../models/organization.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations); this line test the information collection displaying it to the console

    const title = 'Our Partners Organizations';
    res.render('organizations', { title, organizations });

};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};


export { showOrganizationsPage, showOrganizationDetailsPage };