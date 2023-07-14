import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoLogService, MongoRbacService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.245.22/log', {
      retryAttempts: 6,
      retryDelay: 6,
      connectionName: 'log',
    //   auth: { username: 'admin', password: '123456' }
    }),

    MongooseModule.forRoot('mongodb://192.168.245.22/rbac', {
      retryAttempts: 6,
      retryDelay: 6,
      connectionName: 'rbac',
    //   auth: { username: 'admin', password: '123456' }
    }),
  ],

  providers: [MongoRbacService, MongoLogService],
  exports: [MongoRbacService, MongoLogService],
})
export class MongoModule {}
