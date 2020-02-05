import { IsString, IsEmail, Length, IsOptional, IsIn, IsDate, MaxDate, Matches } from 'class-validator';

export class UserDto {

    @IsEmail()
    email: string;

    @IsString()
    @Length(2, 255)
    username: string;

    @IsOptional()
    @IsDate()
    @MaxDate(new Date())
    birthdate: Date | null;

    @IsString()
    @Length(8, 255)
    @Matches(/.*[a-z].*/)
    @Matches(/.*[A-Z].*/)
    @Matches(/.*[0-9].*/)
    password: string;

    @IsString()
    @IsIn(['player', 'gamemaster'])
    role: string;
}