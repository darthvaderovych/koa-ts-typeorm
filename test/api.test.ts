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
    it('returns status 200 and users array', () => {
      axios.get(`${host}/api/users/`)
        .then((response) => {
          assert.strictEqual(response.status, 200);
          assert.isArray(response.data);
        });
    });
  });

  describe('GET user by id - /api/users/:id', () => {
    let savedUser: any;

    before(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('responds with status 200 and the user object', async () => {
      const response = await axios.get(`${host}/api/users/${savedUser.id}`);
      assert.strictEqual(response.status, 200);
      assert.deepEqual(response.data, savedUser);
    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('DELETE user by id - /api/users/:id', () => {
    let savedUser;

    before(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('removes the user and responds with status 204 ', async () => {
      const response = await axios.delete(`${host}/api/users/${savedUser.id}`);
      assert.strictEqual(response.status, 204);
      const result = await userRepo.findOne(savedUser.id);
      console.log(result);
      assert.isUndefined(result);
    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST new user - /api/users/', () => {
    let savedUser: any;

    it('responds with status 201 and the user object', async () => {
      const response = await axios.post(`${host}/api/users/`, config.user);
      savedUser = response.data;
      assert.strictEqual(response.status, 201);
      assert.deepEqual(response.data.username, config.user.username);

    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST new user - /api/users/', () => {
    let savedUser: any;

    it('responds with status 201 and the user object', async () => {
      const response = await axios.post(`${host}/api/users/, config.user`);
      savedUser = response.data;
      assert.strictEqual(response.status, 201);
      assert.deepEqual(response.data.username, config.user.username);

    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });

  describe('POST new user - /api/users/', () => {
    let savedUser: any;

    before(async () => {
      const user = await userRepo.create(config.user);
      savedUser = await userRepo.save(user);
    });

    it('responds with status 200 and the token object', async () => {
      const { username, password } = config.user;
      const response = await axios.post(`${host}/api/authenticate/`, { username, password });
      assert.strictEqual(response.status, 200);
      assert.isObject(response.data);
    });

    afterEach(async () => {
      const user = await userRepo.findOne(savedUser.id);
      if (user) {
        await userRepo.remove(savedUser);
      }
    });
  });
});
