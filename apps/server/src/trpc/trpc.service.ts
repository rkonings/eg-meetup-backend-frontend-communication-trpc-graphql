import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

@Injectable()
export class TrpcService {
  trpc = initTRPC.create({
    errorFormatter: (opts) => {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    },
  });
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
