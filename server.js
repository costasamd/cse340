import express from 'express';
import { fileURLToPath } from 'url'
import path from 'path';
import { testConnection } from './src/models/db.js'
import router from './src/controller/routes.js';
/**
 * import { getAllOrganizations } from './src/models/organization.js';
import { getAllProjects } from './src/models/projects.js';
import { displayCategories } from './src/models/categories.js';

**/

//environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

//paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * configure Express middleware
 */

// serve static files from the public directory

app.use(express.static(path.join(__dirname, 'public')));

// set the ejs as engine
app.set('view engine', 'ejs');

// indicate where to find the template
app.set('views', path.join(__dirname, 'src/views'));

//middleware to log all incoming requests

app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    next() //pass control to the next middleware
});

//middleware that makes the NODE_ENV available to all templates

app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


/**
 * routes
 */

/*
below is an example to how send html static files with route node server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

*/

/* example of route before changing to full MVC structure

app.get('/', (req, res) => {

    const title = 'Home'
    res.render('home', { title });


});
*/

//use the import router to handle the routes
app.use(router);


//error handlers

//catch-all route for 404 errors
app.use((rew, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    //log error details for debugging
    console.error('Error ocurred:', err.message);
    console.error('Stack trace:', err.stack);

    //determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    //prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    //render the appropriate error template
    res.status(status).render(`error/${template}`, context);
});

//Port

app.listen(PORT, async () => {
    try {
        await testConnection();
        
        console.log(`Server is running at http://127.0.0.1:${PORT}`);

        console.log(`Environment: ${NODE_ENV}`)

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    
})