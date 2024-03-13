import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('board')
// 인증된 유저만 글을 쓸 수 있도록 authModule을 import해서 UseGuards 사용 
// authModule의 import는 boardModule에서 이루어짐
@UseGuards(AuthGuard())
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Get()
    getAllBoards(@GetUser() user: User): Promise<Board[]> {
        return this.boardService.getAllBoards(user);
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
