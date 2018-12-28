import User from '../src/db/entity/User';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { assert } from 'chai';
import dbOpts from '../config/db';

describe('Database connection', () => {
  it('Get connection object', async () => {
    const connection = await createConnection(dbOpts);

    assert.isObject(connection);
  });
});
