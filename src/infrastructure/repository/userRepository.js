const db = require('../db/connections.js');

const UserRepository = {
    // Create
    create: async (userEntity) => {
        const query = 'INSERT INTO users (email, password, name, phone_number, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const now = new Date();
        const {rows} = await db.query(query, [userEntity.email, userEntity.password, userEntity.name
            , userEntity.phoneNumber, userEntity.status, now, now]);
        return rows[0];
    },

    // Read (단건)
    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        const {rows} = await db.query(query, [id]);
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const {rows} = await db.query(query, [email]);
        return rows[0];
    },

    // Read (모든 사용자)
    findAll: async () => {
        const query = 'SELECT * FROM users ORDER BY id ASC';
        const {rows} = await db.query(query);
        return rows;
    },

    // Update
    update: async (id, userEntity) => {
        const query = 'UPDATE users SET name = $1, phone_number = $2, updated_at = $3 WHERE id = $4 RETURNING *';
        const now = new Date();
        const {rows} = await db.query(query, [userEntity.name, userEntity.phoneNumber, now, id]);
        return rows[0];
    },

    // Delete
    delete: async (id) => {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const {rows} = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = UserRepository;
