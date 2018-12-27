import app from './app/app';
import dbConnection from './db/connection';

const PORT:number = Number(process.env.PORT) || 9000;

dbConnection.then(() => {
  console.log('db connected');
  app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));

}).catch((e) => {
  console.log(e);
});
