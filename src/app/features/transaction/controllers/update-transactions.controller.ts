import { Request, Response } from 'express';
import { UpdateTransactionUseCase } from '../usecases/update-transaction.usecase';
import { ApiResponse } from '../../../shared/util/http-response.adapter';

export class UpdateTransactionController {
    constructor(private updateUsecase: UpdateTransactionUseCase) {}

    public async update(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params;
            const { title, value, type, date } = req.body;

            const result = await this.updateUsecase.execute({
                userId: id,
                transactionId,
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
