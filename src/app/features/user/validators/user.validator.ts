import { Request, NextFunction, Response } from 'express';
import { ApiResponse } from '../../../shared/util/http-response.adapter';

export class UserValidator {
    public static validateCreateFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, email } = req.body;

            if (!name) {
                return ApiResponse.notProvided(res, 'Nome');
            }
            if (!email) {
                return ApiResponse.notProvided(res, 'E-mail');
            }

            const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

            if (!email.match(validEmail)) {
                return ApiResponse.invalidField(res, 'E-mail');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public static validatePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { password, repeatPassword } = req.body;

            if (!password) {
                return ApiResponse.notProvided(res, 'Senha');
            }

            if (password.length < 4) {
                return ApiResponse.badRequest(
                    res,
                    'Senha deve ter no minimo 4 carateres'
                );
            }

            if (password.length > 12) {
                return ApiResponse.badRequest(
                    res,
                    'Senha deve ter no máximo 12 carateres'
                );
            }

            if (!repeatPassword) {
                return ApiResponse.notProvided(res, 'Repetição da senha');
            }
            if (password !== repeatPassword) {
                return ApiResponse.badRequest(res, 'Senha divergentes');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
