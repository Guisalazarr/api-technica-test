import { Router, Request, Response } from 'express';
import { UserController } from '../util/user.factory';
import { UserValidator } from '../validators/user.validator';
import { LoginValidator } from '../validators/login.validator';
import { transacionRoutes } from '../../transaction/routes/transaction.routes';

export const appRoutes = () => {
    const app = Router();

    const controller = new UserController();

    app.post(
        '/',
        [UserValidator.validateCreateFields, UserValidator.validatePassword],
        (req: Request, res: Response) => {
            controller.createUser.create(req, res);
        }
    );

    app.post(
        '/login',
        [LoginValidator.validateFieldsLogin],
        (req: Request, res: Response) => {
            controller.loginUser.login(req, res);
        }
    );

    app.use('/:id/transaction', transacionRoutes());

    return app;
};
