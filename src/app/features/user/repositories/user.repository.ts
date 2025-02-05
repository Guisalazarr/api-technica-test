import { Database } from '../../../../main/database/database.connection';
import { User } from '../../../models/user.model';
import { UserEntity } from '../../../shared/database/entities/user.entity';

export class UserRepository {
    private repository = Database.connection.getRepository(UserEntity);

    public async create(user: User) {
        const result = this.repository.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        });

        await this.repository.save(result);
    }

    public async get(id: string) {
        const result = await this.repository.findOneBy({
            id,
        });

        if (!result) {
            return undefined;
        }

        return UserRepository.mapRowToModel(result);
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await this.repository.findOneBy({ email });

        if (!result) {
            return undefined;
        }

        return UserRepository.mapRowToModel(result);
    }

    public static mapRowToModel(user: UserEntity) {
        return User.create(user);
    }
}
