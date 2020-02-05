import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeancesService } from './seances.service';
import { Seance } from './seances.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Seance])],
	providers: [SeancesService],
	exports: [SeancesService],
})
export class SeancesModule {}