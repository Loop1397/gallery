import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { FileModule } from './file/file.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),
    AuthModule, BoardModule, AuthModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
