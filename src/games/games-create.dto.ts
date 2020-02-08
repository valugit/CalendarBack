import { IsString, Length, IsHexColor } from 'class-validator';

export class GameDto {
    @IsString()
    @Length(2, 255)
    name: string;

    @IsString()
    info: string;

    @IsString()
    @IsHexColor()
    color: string;
}