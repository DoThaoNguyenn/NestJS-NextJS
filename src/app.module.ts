import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
 
    ConfigModule.forRoot(),
 
    AuthModule,

    ConfigModule.forRoot(),

    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
