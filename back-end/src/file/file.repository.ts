import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { File } from "./file.entity";

//TODO: ERROR [ExceptionsHandler] DataSource is not set for this entity. 에러 해결
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
}