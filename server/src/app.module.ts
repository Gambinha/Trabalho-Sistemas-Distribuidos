import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './core/guards/auth.guard';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { TodoModule } from './features/todo/todo.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      privateKey: 'secret',
    }),
    ConfigModule,
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
