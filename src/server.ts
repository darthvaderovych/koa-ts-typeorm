import app from './app/app';
import { createConnection } from 'typeorm';

const PORT:number = Number(process.env.PORT) || 9000;

createConnection().then(async (connection) => {
  console.log('db connected');
  app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));

}).catch((e) => {
  console.log(e);
});
