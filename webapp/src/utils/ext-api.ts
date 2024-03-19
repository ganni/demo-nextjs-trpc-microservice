import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { ExtApiRouter } from '../../../api/api';

export const extApiClient = createTRPCClient<ExtApiRouter>({
  links: [
    httpBatchLink({
      url: process.env.API_TRPC_URL ?? `http://localhost:3005/trpc`,
    }),
  ],
});
