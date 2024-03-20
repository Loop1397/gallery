import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        const { title, content, author} = createBoardDto;

        // const board = new Board();
        // board.title = title;
        // board.content = content;
        // board.author = author;
        // board.status = BoardStatus.PUBLIC;

        const board = this.create({
            title,
            content,
            status: BoardStatus.PUBLIC,
            user,
        })

        await this.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        // findOneBy : typeORM에서 제공하는 메소드중 하나
        const found = await this.findOneBy({id: id});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async updateBoard(id: number, user: User, body: any) {
        const { title, content } = body;

        const found = await this.getBoardById(id);

        //게시글의 원 작성자와 요청을 보낸 작성자가 다를 경우 에러
        if(user !== found.user) {
            throw new UnauthorizedException('게시글을 작성한 유저와 다른 id로 접근했습니다.');
        }
        
        found.title = title;
        found.content = content;
        found.user = user;
        await found.save();
    }
}