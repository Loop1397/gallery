import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileRepository } from './file.repository';

@Module({
  providers: [
    FileService,
    FileRepository,
  ],
  controllers: [FileController],
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ]
})
export class FileModule {}
