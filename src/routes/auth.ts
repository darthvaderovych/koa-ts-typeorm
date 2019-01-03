import * as Koa from 'koa';
import * as Router from 'koa-router';
import helpers from '../helpers';
import { getRepository, Repository } from 'typeorm';
import userEntity from '../db/entity/User';

const router: Router = new Router();

router.post('/api/authenticate', async (ctx:Koa.Context) => {
  const userRepo:Repository<userEntity> = getRepository(userEntity);

  if (ctx.request.type === 'application/json') {
    try {
      const body = await helpers.validateAuthData(ctx.request.body);

      if (!body) {
        return ctx.status = 400;
      }
      const { username, password } = body;
      const user = await userRepo.findOne({ where: { username, password } });

      if (!user) {
        return ctx.status = 404;
      }

      try {
        const token = helpers.createToken(username, password);
        ctx.status = 200;
        ctx.body = { token };
      } catch (e) {
        ctx.status = 500;
      }

    } catch (e) {
      console.log(e);
      ctx.status = 400;
    }
  } else {
    ctx.status = 400;
  }
});

export default router;
