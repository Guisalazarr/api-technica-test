import { User } from '../../../models/user.model';
import { Return } from '../../../shared/util/return.adpter';
import { UserRepository } from '../repositories/user.repository';

interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUsecase {
    constructor(private userRepository: UserRepository) {}

    public async execute(params: CreateUserParams) {
        const findEmail = await this.userRepository.getUserByEmail(
            params.email
        );

        if (findEmail) {
            return Return.badRequest('Este e-mail já foi cadastrado');
        }

        const user = new User(params.name, params.email, params.password);
        await this.userRepository.create(user);

        return Return.create('Usuário', user.toJson());
    }
}
