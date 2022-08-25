import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog',
      entities: ['dist/**/*.entity{.ts,.js}'],
      dropSchema: false,
      synchronize: true,
      migrationsRun: false,
      logging: true,
      migrations: ['dist/**/db/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/db/migrations',
      },
    }),
    AuthModule,
    ConfigModule.forRoot()

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
