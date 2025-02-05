import { TransactionType } from '../../../models/transaction.models';
import { Return } from '../../../shared/util/return.adpter';
import { UserRepository } from '../../user/repositories/user.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

export interface UpdateTransactionParams {
    userId: string;
    transactionId: string;
    title?: string;
    value?: number;
    type?: TransactionType;
    date?: Date;
}

export class UpdateTransactionUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ) {}

    public async execute(params: UpdateTransactionParams) {
        const user = await this.userRepository.get(params.userId);

        if (!user) {
            return Return.notFound('Usuário');
        }

        const transaction = await this.transactionRepository.get(
            params.transactionId
        );

        if (!transaction) {
            return Return.notFound('Transações');
        }

        if (params.title) {
            transaction.title = params.title;
        }

        if (params.value) {
            transaction.value = params.value;
        }

        if (params.type) {
            transaction.type = params.type;
        }

        await this.transactionRepository.update(transaction);

        const transactions = await this.transactionRepository.list({
            userId: user.id,
        });

        const result = transactions.map((transaction) => transaction.toJson());

        return Return.success('TRansação editada com sucesso', result);
    }
}
