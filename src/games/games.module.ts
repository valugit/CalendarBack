import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './games.service';
import { Game } from './games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService],
})
export class GamesModule {}