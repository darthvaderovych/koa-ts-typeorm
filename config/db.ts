import { ConnectionOptions } from 'typeorm';

const dbOpts:ConnectionOptions =  {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: process.env.POSTGRES_DB || 'testdb',
  synchronize: true,
  logging: false,
  entities: [
    'src/db/entity/**/*.ts',
  ],
};

export default dbOpts;
