import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import dbOpts from '../../config/db';
// import userEntity from './entity/User';

// const connectionOpts: ConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'testdb',
//   synchronize: true,
//   logging: false,
//   entities: [
//     userEntity,
//   ],
// };

const connection:Promise<Connection> = createConnection(dbOpts);

export default connection;
