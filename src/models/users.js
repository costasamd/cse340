import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, roles_id) 
        VALUES ($1, $2, $3, (SELECT roles_id FROM roles WHERE roles_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];

    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.roles_name 
        FROM users u
        JOIN roles r ON u.roles_id = r.roles_id
        WHERE email = $1
    `;
    const query_params = [email];

    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    return result.rows[0];
};

const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.roles_name
        FROM users u
        JOIN roles r ON u.roles_id = r.roles_id
    `;

    const result = await db.query(query);

    return result.rows;
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
        return null; // Invalid password
    }

    //return user object without password hash for security reasons

    return user; // Authentication successful
};

const removeMeFromProject = async (userId, projectId) => {
    try {
        const query = `
        DELETE FROM volunters
        WHERE user_id = $1 AND project_id = $2
    `;

        return await db.query(query, [userId, projectId]);
    } catch (error) {
        console.error('Error removing user from project:', error);
        throw error;
    };
    
};

const assignUserToProject = async (userId, projectId) => {
    try {
        const query = `
        INSERT INTO volunters (user_id, project_id)
        VALUES ($1, $2);
    `;

        return await db.query(query, [userId, projectId]);
    } catch (error) {
        console.error('Error assigning user to project:', error);
        throw error;
    };
};

//create a check condition for assigned user
const checkUserAssignment = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM volunters
        WHERE user_id = $1 AND project_id = $2
        LIMIT 1;
        `;
    
    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};



export { createUser, authenticateUser, getAllUsers, removeMeFromProject, assignUserToProject, checkUserAssignment };