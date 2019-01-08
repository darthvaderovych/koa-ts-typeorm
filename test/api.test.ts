import axios from 'axios';
import { assert } from 'chai';
import { Repository, createConnection } from 'typeorm';
import User from '../src/db/entity/User';
import config from  '../config/test';
import dbOpts from '../config/db';

describe('API routes', () => {
  const host = config.host;
  let connection;
  let userRepo: Repository<User>;

  before(async () => {
    connection = await createConnection(dbOpts);
    userRepo = connection.getRepository(User);
  });

  describe('GET all users - /api/users', () => {
    it('returns status 200 and users array', async () => {
      const response = await axios({
        method: 'get',
        url: `${host}/api/users/`,
      });
      assert.strictEqual(response.status, 200);
      assert.isArray(response.data);
    });
  });

  describe('GET user by id - /api/users/:id', () => {
    let savedUser: any;

    beforeEach(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('responds with status 200 and the user object, if valid id', async () => {
      const response = await axios({
        method: 'get',
        url: `${host}/api/users/${savedUser.id}`,
      });
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data, savedUser);
    });

    it('responds with status 404, if ivalid id', async () => {
      const invalidUserId = config.invalidUserId;
      const response = await axios({
        method: 'get',
        url: `${host}/api/users/${invalidUserId}`,
        validateStatus: () => true,
      });
      assert.strictEqual(response.status, 404);

    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('DELETE user by id - /api/users/:id', () => {
    let savedUser: any;

    beforeEach(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('removes the user and responds with status 204 ', async () => {
      const response = await axios({
        method: 'delete',
        url: `${host}/api/users/${savedUser.id}`,
      });
      assert.strictEqual(response.status, 204);
      const result = await userRepo.findOne(savedUser.id);
      assert.isUndefined(result);
    });

    it('responds with status 404, if ivalid id', async () => {
      const invalidUserId = config.invalidUserId;
      const response = await axios({
        method: 'delete',
        url: `${host}/api/users/${invalidUserId}`,
        validateStatus: () => true,
      });
      assert.strictEqual(response.status, 404);
    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST valid user  data - /api/users/', () => {
    let savedUser: any;

    it('responds with status 201 and the user object', async () => {
      const response = await axios({
        method: 'post',
        url: `${host}/api/users/`,
        data: config.user,
      });
      savedUser = response.data;
      assert.strictEqual(response.status, 201);
      assert.deepEqual(response.data.username, config.user.username);

    });

    after(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST invalid user data - /api/users/', () => {

    it('responds with status 400, if invalid user data', async () => {
      const response = await axios({
        method: 'post',
        url: `${host}/api/users/`,
        validateStatus: () => true,
        data: config.invalidUser,
      });

      assert.strictEqual(response.status, 400);
    });
  });

  describe('POST /api/users/ - authenticate user', () => {
    let savedUser: any;

    before(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('responds with status 200 and the token object', async () => {
      const { username, password } = config.user;
      const response = await axios({
        method: 'post',
        url: `${host}/api/authenticate/`,
        data: { username, password },
      });
      assert.strictEqual(response.status, 200);
      assert.isObject(response.data);
    });

    after(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST invalid auth data - /api/authenticate/', () => {
    let savedUser: any;

    beforeEach(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('responds with status 404, if no user found', async () => {
      const { username, password } = savedUser;
      const wrongPassword = `${password} + '1'`;

      const response = await axios({
        method: 'post',
        url: `${host}/api/authenticate/`,
        validateStatus: () => true,
        data: { username, password: wrongPassword },
      });
      assert.strictEqual(response.status, 404);

    });

    it('responds with status 400, if invalid auth data', async () => {
      const { username } = savedUser;
      const invalidPassword = 'pass'; // "password" length must be at least 6 characters long'

      const response = await axios({
        method: 'post',
        url: `${host}/api/authenticate/`,
        validateStatus: () => true,
        data: { username, password: invalidPassword },
      });
      assert.strictEqual(response.status, 400);
    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });
});
