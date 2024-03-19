import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { extApiClient } from '@/utils/ext-api';

/** default count of users' data to fetch */
const FETCH_USERS_COUNT = 10;
/** default pagination size for fetching `testRecord` rows */
const PAGINATION_PAGE_SIZE = 1000;

const idSchema = z.object({ id: z.string() });
export const testRecordRouter = createTRPCRouter({
  //get all records
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.testRecord.findMany({
      skip: 0,
      take: PAGINATION_PAGE_SIZE, // limit to top 1000
      orderBy: {
        created_at: 'desc',
      },
    });
  }),

  //get record by id
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.prisma.testRecord.findUnique({
      where: idSchema.parse(input),
    });
  }),

  // fetch and save test records
  addData: publicProcedure
    .input(z.number().default(FETCH_USERS_COUNT))
    .mutation(async ({ input, ctx }) => {
      const apiRes = await extApiClient.fetchRecords.query(input);
      apiRes.map(async (patientRecords) => {
        return await ctx.prisma.testRecord.createMany({
          data: patientRecords.map((d) => ({
            ...d,
            date_testing: new Date(d.date_testing),
            date_birthdate: new Date(d.date_birthdate),
          })),
          skipDuplicates: true,
        });
      });
      return { success: true };
    }),

  // //delete post
  // deletePost: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
  //   return ctx.prisma.post.delete({
  //     where: idSchema.parse(input),
  //   });
  // }),

  //delete all post
  deleteAll: publicProcedure.mutation(({ ctx }) =>
    ctx.prisma.testRecord.deleteMany()
  ),
});
