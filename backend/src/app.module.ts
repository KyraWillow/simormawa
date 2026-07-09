import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseModule } from "./libs/db/database.module";

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule]
})
export class AppModule {

}