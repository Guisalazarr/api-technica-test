import { Request, Response } from "express";
import { GetTransactionUseCase } from "../usecases/get-transaction.usecase";
import { ApiResponse } from "../../../shared/util/http-response.adapter";


export class GetTransactionController{
    constructor(private getUseCase: GetTransactionUseCase){}

    public async get(req: Request, res: Response){
        try{
            const {id, transactionId} =req.params

            const result = await this.getUseCase.execute({
                userId: id,
                transactionId
            })

            return res.status(result.code).send(result)

        }catch(error: any){
            return ApiResponse.serverError(res, error)
        }
    }
}