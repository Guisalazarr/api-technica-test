import { Request, Response } from 'express';
import { CreateTransactionUsecase } from '../usecases/create-transaction.usecase';
import { ApiResponse } from '../../../shared/util/http-response.adapter';

export class CreateTransactionController {
    constructor(private createUseCase: CreateTransactionUsecase) {}

    public async create(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, value, type } = req.body;

            const result = await this.createUseCase.execute({
                userId: id,
                title,
                value,
                type,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
