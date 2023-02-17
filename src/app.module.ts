import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/Guards/jwt-auth.guards';
import { ProvidersModule } from './providers/providers.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsersModule,
    ExpensesModule,
    AuthModule,
    ProvidersModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        auth: {
          user: 'kianna.lubowitz@ethereal.email',
          pass: 'bGzmGYuzQP71Zc4HEn',
        },
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
