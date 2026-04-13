import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers, removeMeFromProject, assignUserToProject } from '../models/users.js';
import { getProjectsByUserId } from '../models/projects.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/dashboard');
            
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const showDashboard = (req, res) => {
    const user = req.session.user;
    
    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        projects: req.projects || []
    });
};

const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.roles_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/dashboard');
        }

        // User has required role, continue
        next();
    };
};

//factory function to create middleware that checks for specific user roles
/*const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.roles_name === role) {
            next();
        } else {
            req.flash('error', 'You do not have permission to access that page.');
            res.redirect('/');
        }

    }

} */

const showAllUsers = async (req, res) => {
    const users = await getAllUsers();

    const title = 'All Users';

    res.render('users', { title, users });
};

const displayProjectsByUser = async (req, res, next) => {

    const userId = req.session.user.user_id;

    console.log('session user ID:', userId);

    const projects = await getProjectsByUserId(userId);

    console.log('projects from db:', projects);

    req.projects = projects || [];

    next();
}

const removeUserFromProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    try {
        await removeMeFromProject(userId, projectId);
        req.flash('success', 'You have been removed from the project.');
    }
    catch (error) {
        console.error('Error removing user from project:', error);
        req.flash('error', 'An error occurred while trying to remove you from the project. Please try again.');
    }

    res.redirect('/dashboard');
};

const assignUserToThisProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.project_id || req.params.projectId; // Handle both cases where project ID might come from URL params

    try {
        await assignUserToProject(userId, projectId);
        req.flash('success', 'You have been added to the project.');
    }catch (error) {
        console.error('Error assigning user to project:', error);
        req.flash('error', 'An error occurred while trying to add you to the project. Please try again.');
    }

    res.redirect(`/project/${projectId}`);
};



export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showAllUsers, displayProjectsByUser, removeUserFromProject, assignUserToThisProject };