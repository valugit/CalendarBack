import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceService } from './seances.service';
import { Seance } from './seances.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Seance])],
	providers: [SeanceService],
})
export class SeancesModule {}