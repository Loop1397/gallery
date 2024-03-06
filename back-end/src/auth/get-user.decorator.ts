import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

// 커스텀 데코레이터 제작
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    // ctx.switchToHttp().getRequest() : @Req() req와 똑같음
    // @UseGuards(AuthGuard())가 선행되어야 이 커스텀 데코레이터가 실행 가능함
    // 왜냐하면 위의 데코레이터가 있어야 request안에 user 정보도 들어가기 때문
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})