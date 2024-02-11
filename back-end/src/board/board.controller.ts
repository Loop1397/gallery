import { Body, Controller, Delete, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise <Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: number): Promise <void> {
        return this.boardService.deleteBoardById(id);
    }
}
