import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

/**
 *  TODO
 *  [x] : 원본 그림파일 업로드 기능 만들기
 *  [ ] : 영어가 아닌 파일 업로드 시 문자 깨지는거 고치기 
  * */ 
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './file/image',
            filename(req, file, callback) {
                // path.extname : 파일 확장자 가져오기
                //const extension = path.extname(file.originalname);
                callback(null, `${file.originalname}`)
            },
        })
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadImage(file);
    }

    @Get()
    getAllImagePath() {
        return this.fileService.getAllImagePath();
    }

    @Get('/:id')
    getImageData(@Param('id') id: number) {
        return this.fileService.getImageData(id);
    }

    /** 
     * TODO: 이미지 제대로 나오게 변경
     * [x] : 해결
     * */ 
    @Get('/image/:imageName')
    getImageByName(@Param('imageName') imageName: string, @Res() res: Response) {
        const imagePath = path.join(__dirname, '..', '..', 'file', 'image', imageName);

        try {
            // 요청된 이미지 파일이 서버에 존재하는지 확인
            if (fs.existsSync(imagePath)) {
              // 존재한다면 해당 이미지 파일을 클라이언트에게 반환
              return res.sendFile(imagePath);
            } else {
              // 존재하지 않는다면 404 Not Found 오류를 클라이언트에게 반환
              return res.status(404).json({ message: 'Image not found' });
            }
          } catch (error) {
            // 파일 읽기 중에 에러가 발생한 경우 500 Internal Server Error를 반환
            return res.status(500).json({ message: 'Internal Server Error' });
          }
    }

    @Delete('/:id')
    deleteImageById(@Param('id') id:number) {
        return this.fileService.deleteImageById(id);
    }

}
