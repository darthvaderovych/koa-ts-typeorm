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
  host: 'http://localhost:9000',
};

export default testConfig;
