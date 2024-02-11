import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async getBoardById(id: number): Promise <Board> {
        // findOneBy : typeORM에서 제공하는 메소드중 하나
        const found = await this.findOneBy({id: id});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async createBoard(body): Promise <Board> {
        const { title, content, author} = body;

        const board = new Board();
        board.title = title;
        board.content = content;
        board.author = author;
        board.status = BoardStatus.PUBLIC;
        await board.save();

        return board;
    }

    async deleteBoardById(id: number): Promise <void> {
        const result = await this
        .createQueryBuilder()
        .delete()
        .where("id = :id", {id: id})
        .execute()

        // 존재하지 않는 id를 지우지 않으려고 할 때
        if(!result.affected) {
            throw new NotFoundException('존재하지 않는 id');
        }
    }
}