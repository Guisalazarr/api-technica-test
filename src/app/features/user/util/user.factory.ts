import { CreateUserController } from '../controllers/create-user.controller';
import { LoginUserController } from '../controllers/login-user.controller';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { LoginUserUsecase } from '../usecases/login-user.usecase';

export class UserController {
    private get userReposigleton() {
        return new UserRepository();
    }

    public get createUser() {
        const createUsecase = new CreateUserUsecase(this.userReposigleton);
        return new CreateUserController(createUsecase);
    }

    public get loginUser() {
        const loginUsecase = new LoginUserUsecase(this.userReposigleton);
        return new LoginUserController(loginUsecase);
    }
}
