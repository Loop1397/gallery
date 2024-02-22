import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // TypeORM 설정
    TypeOrmModule.forRoot(typeORMConfig),
    // 정적 파일 제공을 위한 public 폴더 설정
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../files'),
    }),
    AuthModule, BoardModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
