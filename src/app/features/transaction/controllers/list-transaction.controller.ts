import { Request, Response } from "express";
import { ListTransactionUseCase } from "../usecases/list-transactions.usecase";
import { ApiResponse } from "../../../shared/util/http-response.adapter";
import { TransactionType } from "../../../models/transaction.models";


export class ListTransactionController{
    constructor(private listUsecase: ListTransactionUseCase){}

    public async list(req: Request, res: Response){
        try{
            const {id} = req.params
            const {type} = req.query

            const result = await this.listUsecase.execute({
                userId: id,
                type: type as TransactionType
            })

            return res.status(result.code).send(result)

        }catch(error: any){
            return ApiResponse.serverError(res, error)
        }
    }
}