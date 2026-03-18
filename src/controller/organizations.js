import { getAllOrganizations } from '../models/organization.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations); this line test the information collection displaying it to the console

    const title = 'Our Partners Organizations';
    res.render('organizations', { title, organizations });

};

export { showOrganizationsPage };