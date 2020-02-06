import { IsString, Length, MinDate, IsInt, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class SeanceDto {

    @IsString()
    @Length(10, 1024)
    title: string;

    @IsInt()
    gamemaster: number;

    @IsInt()
    seance_game: number;

    @IsOptional()
    @IsBoolean()
    mature: Boolean;

    @IsDateString()
    start: Date;

    @IsDateString()
    // May need to check if end > start
    end: Date;
}