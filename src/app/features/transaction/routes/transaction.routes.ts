import { Response, Request, Router } from 'express';
import { TransactionController } from '../util/transaction.factory';
import { TransactionValidator } from '../validators/transaction.middleware';
import { LoginValidator } from '../../user/validators/login.validator';

export const transacionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    const logged = [LoginValidator.checkToken];
    const controller = new TransactionController();

    app.get('/', logged, (req: Request, res: Response) =>
        controller.listTransaction.list(req, res)
    );

    app.get('/:transactionId', logged, (req: Request, res: Response) =>
        controller.getTransaction.get(req, res)
    );

    app.post(
        '/',
        logged,
        [
            TransactionValidator.validateCreateFields,
            TransactionValidator.validateTypeTransaction,
        ],
        (req: Request, res: Response) =>
            controller.createTransaction.create(req, res)
    );

    app.put(
        '/:transactionId',
        logged,
        [TransactionValidator.validateTypeTransaction],
        (req: Request, res: Response) =>
            controller.updateTransaction.update(req, res)
    );

    app.delete('/:transactionId', logged, (req: Request, res: Response) =>
        controller.deleteTransaction.delete(req, res)
    );

    return app;
};
