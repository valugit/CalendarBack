import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configHerokuService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { SeancesModule } from './seances/seances.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configHerokuService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    GamesModule,
    SeancesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }