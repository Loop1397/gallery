import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    /* getAllBoards(): Board[] {
        return this.boards;
    } */

    getBoardById(id: number): Promise <Board> {
        return this.boardRepository.getBoardById(id);
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    updateBoard(id:number, body:any) {
        return this.boardRepository.updateBoard(id, body);
    }

    deleteBoardById(id: number): Promise <void> {
        return this.boardRepository.deleteBoardById(id);
    }
}
