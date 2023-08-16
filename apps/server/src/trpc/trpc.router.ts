import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from 'src/user/user.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService,
  ) {}

  appRouter = this.trpc.router({
    getUserByFirstName: this.trpc.procedure
      .input(
        z.object({
          firstName: z.string(),
        }),
      )

      .output(z.object({ firstName: z.string(), lastName: z.string() }))
      .query(({ input }) => {
        const { firstName } = input;
        const result = this.userService.getByFirstName(firstName);
        if (result) {
          return {
            firstName: result.firstName,
            lastName: result.lastName,
          };
        }

        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }),

    getUsers: this.trpc.procedure
      .output(
        z
          .object({
            firstName: z.string(),
            lastName: z.string(),
          })
          .array(),
      )
      .query(() => {
        return this.userService.getAll();
      }),
    addUser: this.trpc.procedure
      .output(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
        }),
      )
      .input(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
        }),
      )
      .mutation(({ input }) => {
        return this.userService.addUser(input);
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
