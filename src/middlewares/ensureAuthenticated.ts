import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // Receber o Token
    const authToken = request.headers.authorization

    // Validar se o token está preenchido

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")

    // Validar se token é valido
    try {
        const { sub } = verify(token, "e28950a67bf6de056b4cf6458ff2c33d") as IPayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }

    // Recuperar informações do usuário


}