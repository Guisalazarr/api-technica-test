import { Database } from '../../../../main/database/database.connection';
import { Transaction } from '../../../models/transaction.models';
import { TransactionEntity } from '../../../shared/database/entities/transaction.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { ListTransactionsParams } from '../usecases/list-transactions.usecase';

export class TransactionRepository {
    private repository = Database.connection.getRepository(TransactionEntity);

    public async list(params: ListTransactionsParams) {
        const result = await this.repository.find({
            where: {
                idUser: params.userId,
                title: params.title,
            },
            relations: {
                user: true,
            },
        });

        return result.map((row) => this.mapRowToModel(row));
    }

    public async get(transactionId: string) {
        const result = await this.repository.findOneBy({
            id: transactionId,
        });

        if (!result) {
            return undefined;
        }

        return this.mapRowToModel(result);
    }

    public async create(transaction: Transaction) {
        const transactionEntity = this.repository.create({
            id: transaction.id,
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            idUser: transaction.user.id,
        });

        await this.repository.save(transactionEntity);
    }

    public async delete(transactionId: string) {
        const result = await this.repository.delete(transactionId);

        return result.affected ?? 0;
    }

    public async update(transaction: Transaction) {
        await this.repository.update(
            {
                id: transaction.id,
            },
            {
                title: transaction.title,
                value: transaction.value,
                type: transaction.type,
            }
        );
    }

    private mapRowToModel(row: TransactionEntity) {
        const user = UserRepository.mapRowToModel(row.user);

        return Transaction.create(row, user);
    }
}
