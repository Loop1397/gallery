import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileRepository)
        private fileRepository: FileRepository
    ) {}

    uploadImage(file) {
        return this.fileRepository.uploadImage(file);
    }
}
