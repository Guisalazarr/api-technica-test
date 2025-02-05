import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const config = new DataSource({
    type: 'postgres',
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    schema: 'public',
    entities: ['src/app/shared/database/entities/**/*.ts'],
    migrations: ['src/app/shared/database/migrations/**/*.ts'],
});

export default config;
