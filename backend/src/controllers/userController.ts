import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
    const { name, email, password, isSeller } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
        return res.status(400).json({
            msg: `El usuario ${email} ya existe`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            isSeller,
        });
        res.json({
            msg: `Uruario ${name} creado exitosamente!`,
        });
    } catch (error) {
        res.status(400).json({
            msg: "Upps ocurrio un error",
            error,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ where: { email: email } });

    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${email} no existe`,
        });
    }

    if (user.isSeller) {
        const token = jwt.sign(
            {
                email: email,
            },
            process.env.SECRET_KEY || "secret"
        );
        return res.json(token);
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Password incorrecto",
        });
    }

    const token = jwt.sign(
        {
            email: email,
        },
        process.env.SECRET_KEY || "secret"
    );

    res.json(token);
};
