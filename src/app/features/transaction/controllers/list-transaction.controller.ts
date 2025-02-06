import { Request, Response } from 'express';
import { ListTransactionUseCase } from '../usecases/list-transactions.usecase';
import { ApiResponse } from '../../../shared/util/http-response.adapter';

export class ListTransactionController {
    constructor(private listUsecase: ListTransactionUseCase) {}

    public async list(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title } = req.query;

            const result = await this.listUsecase.execute({
                userId: id,
                title: title as string,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
