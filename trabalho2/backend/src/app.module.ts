import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [UsersModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
