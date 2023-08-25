import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userEmail: string;
        }
    }
}

interface IPayload {
    email: string;
    iat: number;
}

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const headerToken = req.headers["authorization"];

    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
        try {
            const bearerToken = headerToken.slice(7);
            const payload = jwt.verify(
                bearerToken,
                process.env.SECRET_KEY || "secret"
            ) as IPayload;
            req.userEmail = payload.email;
            console.log(req.userEmail);
            next();
        } catch (error) {
            res.status(401).json({
                msg: "Token invalido",
            });
        }
    } else {
        res.status(401).json({
            msg: "Acceso denegado",
        });
    }
};

export const isSeller = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user: any = await User.findOne({ where: { email: req.userEmail } });

    if (!user.isSeller) {
        return res
            .status(403)
            .json("Necesitas ser un vendedor para poder realizar esta acciÃ³n");
    }
    next();
};
