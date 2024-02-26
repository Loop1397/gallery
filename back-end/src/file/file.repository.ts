import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { File } from "./file.entity";

/** 
 * TODO: ERROR [ExceptionsHandler] DataSource is not set for this entity. 에러 해결
 * [x] 파일 이름이 entity가 아닌 entiti로 되어있어서 생긴 오류. 
 * */
@Injectable()
export class FileRepository extends Repository<File> {
    constructor(dataSource: DataSource) {
        super(File, dataSource.createEntityManager());
    }

    async uploadImage(file) {
        console.log(file)

        const file_name = file.originalname;
        const file_path = file.path;
        const mime_type = file.mimetype;

        const newFile = new File();
        newFile.file_name = file_name;
        newFile.file_path = file_path;
        newFile.mime_type = mime_type;

        await newFile.save()
    }

    async getAllImageName() {
        const images: Array<any> = await this
            .createQueryBuilder()
            .select('*')
            .execute();

        const result = [];
        images.forEach((image) => {
            result.push(image.file_name);
        })

        return result;
    }

    async getImageData(id: number) {
        const found = await this.findOneBy({file_number: id});

        if(!found) {
            throw new NotFoundException(`Can't find Image with id ${id}`);
        }

        return found;
    }
    
    async deleteImageById(id: number) {
        const result = await this
        .createQueryBuilder()
        .delete()
        .where("file_number = :id", {id: id})
        .execute();

        // 존재하지 않는 id를 지우지 않으려고 할 때
        if(!result.affected) {
            throw new NotFoundException('존재하지 않는 이미지의 id');
        }

        return { message : "file delete success!!" };
    }
}