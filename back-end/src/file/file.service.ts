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

    getImageData(id: number) {
        return this.fileRepository.getImageData(id);
    }

    deleteImageById(id: number) {
        return this.fileRepository.deleteImageById(id);
    }
}
