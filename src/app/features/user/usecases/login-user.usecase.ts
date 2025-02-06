import { Result } from '../../../shared/contracts/result.contract';
import { JwtService } from '../../../shared/service/jwt.service';
import { Return } from '../../../shared/util/return.adpter';
import { UserRepository } from '../repositories/user.repository';

interface LoginParams {
    email: string;
    password: string;
}

export class LoginUserUsecase {
    constructor(private useRepository: UserRepository) {}

    public async execute(params: LoginParams): Promise<Result> {
        const user = await this.useRepository.getUserByEmail(params.email);

        if (!user) {
            return Return.invalidCredencials();
        }

        if (user.password !== params.password) {
            return Return.invalidCredencials();
        }

        const token = new JwtService().createToken(user.toJson());
        return Return.success('Usuário logado com sucesso', {
            id: user.id,
            name: user.name,
            token: token,
        });
    }
}
