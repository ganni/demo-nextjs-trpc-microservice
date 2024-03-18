import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';

import { data as dataJson } from './data';
const t = initTRPC.create();

const appRouter = t.router({
  fetchRecords: t.procedure.input(z.number()).query(async ({ input }) => {
    return dataJson;
    // return await Promise.all(
    //   Array(input)
    //     .fill(0)
    //     .map(() =>
    //       // fetch('https://mockapi-furw4tenlq-ez.a.run.app/data').then(
    //       //   (response) => response.json()
    //       // )
    //     )
    // );
  }),
});

const app = express();
app.use('/trpc', createExpressMiddleware({ router: appRouter }));
app.use(
  cors({ origin: process.env.CORS_CLIENT_ORIGIN ?? 'http://localhost:3000' })
);

app.listen(process.env.PORT ?? 3005);

export type ExtApiRouter = typeof appRouter;
