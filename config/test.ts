const testConfig = {
  user: {
    username: 'John',
    password: 'password',
    email: 'test@mail.com',
  },
  invalidUser: {
    username: 'test',
    password: 'pass', // "password" length must be at least 6 characters long'
    email: 'test@mail.com',
  },
  invalidUserId: '193a260b-1ad5-4980-9670-d42e5da6292',
  host: 'http://localhost:9000',
};

export default testConfig;
