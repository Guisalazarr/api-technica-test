import { ApiResponse } from '../../../shared/util/http-response.adapter';
import { Request, Response } from 'express';
import { LoginUserUsecase } from '../usecases/login-user.usecase';

export class LoginUserController {
    constructor(private loginUserUsecase: LoginUserUsecase) {}

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await this.loginUserUsecase.execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
