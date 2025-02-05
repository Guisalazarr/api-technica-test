import { UserRepository } from "../../user/repositories/user.repository";
import { CreateTransactionController } from "../controllers/create-transaction.controller";
import { DeleteTransactionController } from "../controllers/delete-transactions.controller";
import { GetTransactionController } from "../controllers/get-transaciont.controller";
import { ListTransactionController } from "../controllers/list-transaction.controller";
import { UpdateTransactionController } from "../controllers/update-transactions.controller";
import { TransactionRepository } from "../repositories/transaction.repository";
import { CreateTransactionUsecase } from "../usecases/create-transaction.usecase";
import { DeleteTransactionUseCase } from "../usecases/delete-transactions.usecase";
import { GetTransactionUseCase } from "../usecases/get-transaction.usecase";
import { ListTransactionUseCase } from "../usecases/list-transactions.usecase";
import { UpdateTransactionUseCase } from "../usecases/update-transaction.usecase";


export class TransactionController {
    private get userRepository() {
        return new UserRepository
    }

    private get transactionRepository() {
        return new TransactionRepository
    }

    public get listTransaction() {
        const listtUseCase = new ListTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new ListTransactionController(listtUseCase)
    }

    public get getTransaction() {
        const getUseCase = new GetTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new GetTransactionController(getUseCase)
    }


    public get createTransaction() {
        const createUseCase = new CreateTransactionUsecase(
            this.userRepository,
            this.transactionRepository
        )
        return new CreateTransactionController(createUseCase)
    }

    public get deleteTransaction() {
        const deleteUseCase = new DeleteTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new DeleteTransactionController(deleteUseCase)
    }

    public get updateTransaction() {
        const updateUseCase = new UpdateTransactionUseCase(
            this.userRepository,
            this.transactionRepository
        )
        return new UpdateTransactionController(updateUseCase)
    }
}