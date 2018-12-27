import { ConnectionOptions } from 'typeorm';
import userEntity from '../src/db/entity/User';

const dbOpts:ConnectionOptions =  {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testdb',
  synchronize: true,
  logging: false,
  entities: [
    userEntity,
  ],
};

export default dbOpts;
