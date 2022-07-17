import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserModel } from "../modules/user/models/user.model";

@Injectable()
export class CheckFriendInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const user = await UserModel.get({ id: req.user.user }, true);
    req.isFriend = true;
    req.user = user;
    if (req.params.login && req.params.login != user.login) {
      const friends = user.friends.filter(friend => {
        return (friend.login == req.params.login);
      });
      req.isFriend = (friends.length > 0);
    }
    return next.handle();
  }

}
