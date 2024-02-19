import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadImage(file);
    }

    @Get('/:id')
    getImageById(@Param('id') id: number) {
        return this.fileService.getImageById(id);
    }

    @Delete('/:id')
    deleteImageById(@Param('id') id:number) {
        return this.fileService.deleteImageById(id);
    }

}
