import * as Koa from 'koa';
import userRoutes from '../routes/user';
import authRoute from '../routes/auth';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

const app:Koa = new Koa();

app.use(bodyParser());
app.use(logger());
app.use(userRoutes.routes());
app.use(authRoute.routes());

app.on('error', console.error);

export default app;
