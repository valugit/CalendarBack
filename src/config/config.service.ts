import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return{
            type: 'postgres',
            url: this.getValue('DATABASE_URL'),

            entities: ['dist/**/*.entity{.ts,.js}'],

            synchronize: true,

            migrationsTableName: 'migration',

            migrations: ['migration/*.ts'],

            cli: {
                migrationsDir: 'migration',
            },

            ssl: this.isProduction(),
        };
    }

    public getSecret(): string {
        return this.getValue('SECRET_KEY');
    }

}

const configService = new ConfigService(process.env)
    .ensureValues([
        'DATABASE_URL'
    ]);

const secretKey = new ConfigService(process.env)
    .ensureValues([
        'SECRET_KEY'
    ]);

export { configService };