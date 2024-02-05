import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    createBoard(@Body() body: any): Promise <Board> {
        return this.boardService.createBoard(body);
    }
}
