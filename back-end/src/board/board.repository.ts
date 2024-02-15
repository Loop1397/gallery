import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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

    async updateBoard(id, body) {
        const { title, content, author } = body;

        const found = await this.getBoardById(id);

        //게시글의 원 작성자와 요청을 보낸 작성자가 다를 경우 에러
        if(author !== found.author) {
            throw new UnauthorizedException('author가 다릅니다');
        }
        
        found.title = title;
        found.content = content;
        found.author = author;
        await found.save();
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