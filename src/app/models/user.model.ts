import { v4 as createId } from 'uuid';
import { UserEntity } from '../shared/database/entities/user.entity';

export class User {
    private _id: string;

    constructor(
        private _name: string,
        private _email: string,
        private _password: string
    ) {
        this._id = createId();
    }

    public get id() {
        return this._id;
    }
    public get name() {
        return this._name;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    public toJson() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
        };
    }

    public static create(userEntity: UserEntity) {
        const user = new User(
            userEntity.name,
            userEntity.email,
            userEntity.password
        );

        user._id = userEntity.id;

        return user;
    }
}
