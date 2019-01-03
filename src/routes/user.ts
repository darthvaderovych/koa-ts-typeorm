import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import userEntity from '../db/entity/User';
import helpers from '../helpers';
import * as isUUID from 'is-uuid';

const routerOpts = {
  prefix: '/api/users',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {
  const userRepo:Repository<userEntity> = getRepository(userEntity);
  try {
    const users = await userRepo.find();
    ctx.body = JSON.stringify(users);
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

});

router.post('/', async (ctx:Koa.Context) => {

  if (ctx.request.type === 'application/json') {
    try {
      const body = await helpers.validateUserData(ctx.request.body);

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

router.get('/:id', async (ctx:Koa.Context) => {
  const id = ctx.params.id;

  if (isUUID.anyNonNil(id)) {
    const userRepo:Repository<userEntity> = getRepository(userEntity);
    const user = await userRepo.findOne(id);

    if (!user) {
      ctx.status = 404;
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(user);
    }
  } else {
    ctx.status = 404;
  }
});

router.delete('/:id', async (ctx:Koa.Context) => {
  const id = ctx.params.id;

  if (isUUID.anyNonNil(id)) {
    const userRepo:Repository<userEntity> = getRepository(userEntity);
    const user = await userRepo.findOne(id);

    if (!user) {
      ctx.status = 404;
    } else {
      try {
        await userRepo.delete(user);
        ctx.status = 204;
      } catch (e) {
        console.log(e);
        ctx.status = 500;
      }
    }
  } else {
    ctx.status = 404;
  }
});

export default router;
