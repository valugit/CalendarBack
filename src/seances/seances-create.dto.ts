import { IsString, Length, IsInt, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class SeanceDto {

    @IsString()
    @Length(1, 1024)
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsInt()
    seance_game: number;

    @IsOptional()
    @IsBoolean()
    mature: Boolean;

    @IsDateString()
    start: Date;

    @IsDateString()
    end: Date;
}