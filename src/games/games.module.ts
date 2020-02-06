import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './games.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    providers: [GamesService],
    exports: [GamesService],
})
export class GamesModule {}