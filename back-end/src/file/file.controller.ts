import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadImage(file);
    }

    @Get('/:id')
    getImageData(@Param('id') id: number) {
        return this.fileService.getImageData(id);
    }

    @Get('/image/:imageName')
    getImage(@Res() res: Response, imageName: string) {
        // 이미지 파일의 경로 설정
        const imagePath = `C:\\personal_project\\gallery\\back-end\\image_files\\HI.png`
        console.log(imagePath);

        // 이미지 파일을 읽어와 클라이언트에게 전송
        fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error('Error reading image file:', err);
            res.status(404).send('Image not found');
            return;
        }

        // 이미지 파일의 MIME 타입 설정
        res.setHeader('Content-Type', 'image/png'); // 예시로 png로 설정

        // 이미지 파일을 클라이언트에게 전송
        res.send(data);
        console.log(data);
        });
    }

    @Delete('/:id')
    deleteImageById(@Param('id') id:number) {
        return this.fileService.deleteImageById(id);
    }

}
