import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

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

    createBoard(body: any): Promise <Board> {
        return this.boardRepository.createBoard(body);
    }

    deleteBoardById(id: number): Promise <void> {
        return this.boardRepository.deleteBoardById(id);
    }
}
