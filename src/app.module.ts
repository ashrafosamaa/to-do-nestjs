import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, TaskModule, UserModule } from './Modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-project'),
    AuthModule,
    UserModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
