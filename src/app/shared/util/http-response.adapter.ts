import { Response } from 'express';

export class ApiResponse {
    // Bad Request ----------------------------------------
    public static notFound(res: Response, entity: string) {
        return res.status(404).send({
            ok: false,
            message: `${entity} não foi encontrado`,
        });
    }

    public static notProvided(res: Response, field: string) {
        return res.status(400).send({
            ok: false,
            message: `${field} não foi informado`,
        });
    }

    public static invalidField(res: Response, field: string) {
        return res.status(400).send({
            ok: false,
            message: `${field} é inválido`,
        });
    }

    public static badRequest(res: Response, message: string) {
        return res.status(400).send({
            ok: false,
            message,
        });
    }

    public static invalidCredentials(res: Response) {
        return res.status(401).send({
            ok: false,
            message: 'Acesso não autorizado',
        });
    }

    public static serverError(res: Response, error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }

    // Success Request ------------------------------------------

    public static success(res: Response, message: string, data: any) {
        return res.status(200).send({
            ok: true,
            message,
            data,
        });
    }

    public static createSuccess(res: Response, entity: string, data: any) {
        return res.status(201).send({
            ok: true,
            messge: `${entity} Criado com sucesso`,
            data,
        });
    }
}
