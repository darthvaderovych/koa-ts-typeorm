import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import userEntity from '../db/entity/User';
import helpers from '../helpers';

const routerOpts = {
  prefix: '/api/users',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {
  const userRepo:Repository<userEntity> = getRepository(userEntity);

  const users = await userRepo.find();

  ctx.body = JSON.stringify(users);
});

router.post('/', async (ctx:Koa.Context) => {

  if (ctx.request.type === 'application/json') {
    try {
      const body = await helpers.validateBody(ctx.request.body);

      if (!body) {
        return ctx.status = 400;
      }

      const userRepo:Repository<userEntity> = getRepository(userEntity);
      const user = userRepo.create(body);

      await userRepo.save(user);

      ctx.status = 201;
      ctx.body = JSON.stringify(user);

    } catch (e) {
      console.log(e);
      ctx.status = 400;
    }
  } else {
    ctx.status = 400;
  }
});

export default router;
