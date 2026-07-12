import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import mariadb from 'mariadb';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: (config: ConfigService) => {
                return mariadb.createPool({
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    user: config.get('DB_USER'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                });
            },
            inject: [ConfigService]
        }
    ],
    exports: ['DATABASE_CONNECTION']
})

export class DatabaseModule{}