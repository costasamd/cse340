import express from 'express';
import { fileURLToPath } from 'url'
import path from 'path';

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

/**
 * routes
 */

/*
below is an example to how send html static files with route node server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

*/

app.get('/', (req, res) => {

    const title = 'Home'
    res.render('home', { title });
});

app.get('/organizations', (req, res) => {

    const title = 'Our Partners Organizations';
    res.render('organizations', { title });
});

app.get('/projects', (req, res) => {
    
    const title = 'Service Projects'
    res.render('projects', {title});
});

app.get('/categories', (req, res) => {
   
    const title = 'Categories';
    res.render('categories', { title });
});

//Port

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);

    console.log(`Environment: ${NODE_ENV}`)
})