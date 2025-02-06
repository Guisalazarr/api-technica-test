import {
    Transaction,
    TransactionType,
} from '../../../models/transaction.models';
import { Return } from '../../../shared/util/return.adpter';
import { UserRepository } from '../../user/repositories/user.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { sumTransactionsValues } from '../util/sum.transactions';

export interface ListTransactionsParams {
    userId: string;
    title?: string;
}

export class ListTransactionUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository
    ) {}

    public async execute(params: ListTransactionsParams) {
        const user = await this.userRepository.get(params.userId);

        if (!user) {
            return Return.notFound('Usuário');
        }

        let transactions = await this.transactionRepository.list({
            userId: params.userId,
            title: params.title,
        });

        let income = sumTransactionsValues(
            transactions,
            TransactionType.Income
        );

        let outcome = sumTransactionsValues(
            transactions,
            TransactionType.Outcome
        );

        const result = {
            transactions: transactions.map((transaction) =>
                transaction.toJson()
            ),
            balance: {
                income,
                outcome,
                total: income - outcome,
            },
        };

        return Return.success('Transações listadas com sucesso', result);
    }
}
