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
    @MinDate(new Date())
    date_start: Date;

    @IsDateString()
    @MinDate(new Date())
    // May need to check if date_end > date_start
    date_end: Date;
}