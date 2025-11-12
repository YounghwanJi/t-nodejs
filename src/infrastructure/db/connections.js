require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    // ... 다른 DB 연결 정보들을 여기에 추가
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('데이터베이스 연결 오류', err.stack);
    } else {
        console.log('✅ PostgreSQL 데이터베이스에 성공적으로 연결되었습니다.');
    }
});

module.exports = {
    // 쿼리 실행을 위한 메서드 export
    query: (text, params) => pool.query(text, params),
};