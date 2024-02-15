import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Post()
    createBoard(@Body() body: any) {
        return this.boardService.createBoard(body);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise <Board> {
        return this.boardService.getBoardById(id);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id') id: number,
        @Body() body: any 
    ) {
        return this.boardService.updateBoard(id, body);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: number): Promise <void> {
        return this.boardService.deleteBoardById(id);
    }
}
