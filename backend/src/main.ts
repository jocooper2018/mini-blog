import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

async function bootstrap() {
  const PgSession = pgSession(session);

  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(
    session({
      store: new PgSession({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
        tableName: 'session',
        schemaName: 'miniblog_session',
      }),
      secret: process.env.COOKIE_SECRET ?? 'default-secret', // TODO: Change the secret to a secure one
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
