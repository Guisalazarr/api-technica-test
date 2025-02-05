import { Request, Response } from "express";
import { DeleteTransactionUseCase } from "../usecases/delete-transactions.usecase";
import { ApiResponse } from "../../../shared/util/http-response.adapter";


export class DeleteTransactionController {
    constructor(private deleteUsecase: DeleteTransactionUseCase) { }

    public async delete(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params

            const result = await this.deleteUsecase.execute({
                userId: id,
                transactionId
            })

            return res.status(result.code).send(result)

        } catch (error: any) {
            return ApiResponse.serverError(res, error)
        }
    }
}