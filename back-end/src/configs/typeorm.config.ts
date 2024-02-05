import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    //데이터베이스 타입
    type:'postgres',
    host:'localhost',
    port:5432,
    username: 'postgres',
    password: 'postgres',
    database: 'gallery-project',
    //연결에 사용되는 엔티티를 지정
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    logging: true,
    // true값을 주면 앱을 다시 실행할 때 엔티티 안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성함
    synchronize: true
}
