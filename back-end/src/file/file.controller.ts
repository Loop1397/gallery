import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {

    @UseInterceptors(FilesInterceptor('file'))
    @Post('upload')
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}
