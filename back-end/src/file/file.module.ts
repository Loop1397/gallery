import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [FileService],
  controllers: [FileController],
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ]
})
export class FileModule {}
