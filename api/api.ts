import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';

const t = initTRPC.create();
const PROXY_API_URL = process.env.PROXY_API_URL;

const rowSchema = z.object({
  client_id: z.string(),
  date_testing: z.string(),
  date_birthdate: z.string(),
  gender: z.number(),
  ethnicity: z.number(),
  creatine: z.number(),
  chloride: z.number(),
  fasting_glucose: z.number(),
  potassium: z.number(),
  sodium: z.number(),
  total_calcium: z.number(),
  total_protein: z.number(),
  creatine_unit: z.string(),
  chloride_unit: z.string(),
  fasting_glucose_unit: z.string(),
  potassium_unit: z.string(),
  sodium_unit: z.string(),
  total_calcium_unit: z.string(),
  total_protein_unit: z.string(),
});

const appRouter = t.router({
  fetchRecords: t.procedure
    .input(z.number())
    .output(z.array(z.array(rowSchema)))
    .query(async ({ input }) => {
      if (!PROXY_API_URL) return [];
      return await Promise.all(
        Array(input)
          .fill(0)
          .map(() => fetch(PROXY_API_URL).then((response) => response.json()))
      );
    }),
});

const app = express();
app.use('/trpc', createExpressMiddleware({ router: appRouter }));
app.use(
  cors({ origin: process.env.CORS_CLIENT_ORIGIN ?? 'http://localhost:3000' })
);
const PORT = process.env.PORT ?? 3005;
app.listen(PORT, () => {
  console.log('API started and listening on:', PORT);
});

export type ExtApiRouter = typeof appRouter;
