import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}
