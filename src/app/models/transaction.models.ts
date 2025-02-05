import { v4 as createId } from 'uuid';
import { TransactionEntity } from '../shared/database/entities/transaction.entity';
import { User } from './user.model';

export enum TransactionType {
    Income = 'I',
    Outcome = 'O',
}

export class Transaction {
    private _id: string;

    constructor(
        private _title: string,
        private _value: number,
        private _type: TransactionType,
        private _user: User
    ) {
        this._id = createId();
    }

    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get value() {
        return this._value;
    }
    get type() {
        return this._type;
    }
    get user() {
        return this._user;
    }

    set title(title: string) {
        this._title = title;
    }

    set value(value: number) {
        this._value = value;
    }

    set type(type: TransactionType) {
        this._type = type;
    }

    toJson() {
        return {
            id: this._id,
            title: this._title,
            value: this._value,
            type: this._type,
        };
    }

    public static create(row: TransactionEntity, user: User) {
        const transaction = new Transaction(
            row.title,
            row.value,
            row.type as TransactionType,
            user
        );
        transaction._id = row.id;

        return transaction;
    }
}
