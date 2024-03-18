import { createTRPCRouter } from '@/server/api/trpc';
// import { userRouter } from '@/server/api/routers/user';
import { testRecordRouter } from '@/server/api/routers/test-record';

export const appRouter = createTRPCRouter({
  // user: userRouter,
  testRecord: testRecordRouter,
});

export type AppRouter = typeof appRouter;
